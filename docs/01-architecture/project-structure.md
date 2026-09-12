# Cấu trúc repo và quy trình Build

> Đặc tả cấu hình build. Ràng buộc cốt lõi đã nằm ở `CLAUDE.md`; file này là bản đầy đủ.

---

## 1. Cấu trúc repo

```
<project>/
├── package.json                 task runner. devDeps: concurrently, wait-on. KHÔNG ship
├── CLAUDE.md                    ràng buộc dự án
├── docs/
│
├── shared/                      JS thuần, KHÔNG có package.json
│   ├── channels.js              hằng số tên kênh IPC
│   ├── errors.js                mã lỗi chuẩn
│   └── constants.js
│
├── frontend/                    PACKAGE 1 — chỉ tồn tại lúc build
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│
└── backend/                     PACKAGE 2 — LÀ ứng dụng Electron
    ├── package.json             manifest của app
    ├── electron.vite.config.js
    ├── electron-builder.yml
    ├── resources/               icon, ảnh tĩnh
    ├── src/{main,preload,services,repositories,schemas,db}
    ├── out/                     (sinh ra) main.js, preload.js
    ├── renderer/                (sinh ra) FE build đổ vào đây
    └── release/                 (sinh ra) file cài đặt
```

`.gitignore` bắt buộc có: `node_modules/`, `backend/out/`, `backend/renderer/`, `backend/release/`, `frontend/dist/`, `*.db`, `*.db-wal`, `*.db-shm`, `.env*`

> **`backend/package.json` là manifest của toàn bộ ứng dụng**, không phải "package riêng của backend". `electron-builder` đọc `main`, `name`, `version` và `dependencies` từ đây.

---

## 2. Phân loại dependency

Tiêu chí: *"Gói này có bundle được không?"*

| Loại | Đặt ở | Ví dụ |
|---|---|---|
| Native module (có file `.node`) — không bundle được | `backend/dependencies` | `better-sqlite3` |
| Cần ở runtime thật | `backend/dependencies` | `electron-updater` |
| JS thuần — bundler nhét được vào `out/main.js` | `backend/devDependencies` | `zod`, `date-fns`, `uuid` |
| Công cụ build | `backend/devDependencies` | `electron`, `electron-builder`, `electron-vite` |
| Mọi thứ của Frontend | `frontend/*` | Vite bundle hết vào file tĩnh |

`electron` **luôn** ở `devDependencies`. Đặt vào `dependencies` khiến electron-builder nhét cả runtime ~200MB vào app.

---

## 3. Thư mục `shared/`

Không phải package — là thư mục file JS thuần, cả hai bên trỏ tới bằng alias, bundler mỗi bên tự nhét vào output riêng.

| Bên | Cấu hình |
|---|---|
| Frontend | `resolve.alias['@shared'] = '../shared'` **và** `server.fs.allow = ['..']` |
| Backend | `resolve.alias['@shared'] = '../shared'` |

Thiếu `server.fs.allow` → dev báo *"The request url is outside of Vite serving allow list"*.

`shared/` chỉ chứa hằng số và hàm thuần. Cấm import `fs`/`path`/`electron` (FE nuốt phải) và `react` (BE nuốt phải).

---

## 4. Luồng Development

```
npm run dev (ở gốc)
  ├─ frontend:  vite dev            -> http://localhost:5173
  └─ backend:   wait-on cổng 5173 -> electron-vite dev -> mở BrowserWindow
```

Main phân nhánh nạp nội dung:

| Môi trường | Nạp |
|---|---|
| `!app.isPackaged` | `win.loadURL(process.env.VITE_DEV_SERVER_URL)` |
| `app.isPackaged` | `win.loadFile(path.join(__dirname, '../renderer/index.html'))` |

Backend phải **đợi** Vite sẵn sàng rồi mới mở cửa sổ (`wait-on`), nếu không sẽ thấy màn hình trắng.

---

## 5. Luồng Build production

```
1. cd frontend && vite build        -> đổ thẳng vào backend/renderer/ (nhờ outDir)
2. cd backend  && electron-vite build -> backend/out/main.js, preload.js
3. electron-builder install-app-deps   -> biên dịch lại better-sqlite3 theo ABI Electron
4. electron-builder --win              -> backend/release/<AppName>-Setup-x.y.z.exe
```

Bước 1 dùng `build.outDir: '../backend/renderer'` + `emptyOutDir: true` để bỏ hẳn bước copy — tránh khác biệt `xcopy` / `cp -r` giữa các hệ điều hành.

---

## 6. Cấu hình then chốt

| File | Khoá | Giá trị | Hậu quả nếu sai |
|---|---|---|---|
| `frontend/vite.config.js` | `base` | `'./'` | Bản đóng gói **màn hình trắng** (đường dẫn tuyệt đối hỏng qua `file://`) |
| | `build.outDir` | `'../backend/renderer'` | Phải copy thủ công |
| | `server.fs.allow` | `['..']` | Dev không đọc được `shared/` |
| `backend/electron-builder.yml` | `files` | `out/**`, `renderer/**`, `package.json` | Thiếu `renderer/**` → màn hình trắng |
| | `asarUnpack` | `"**/*.node"` | Bản đóng gói crash: *Cannot find module ...node* |
| | `directories.output` | `release` | |
| `backend/package.json` | `postinstall` | `electron-builder install-app-deps` | `NODE_MODULE_VERSION mismatch` |

Bổ sung:

- Preload phải bundle thành **một file duy nhất**; đường dẫn truyền vào `BrowserWindow` là tuyệt đối (`path.join(__dirname, 'preload.js')`).
- Dữ liệu **luôn** ghi vào `app.getPath('userData')`, không bao giờ ghi cạnh file `.exe`.

---

## 7. Biến môi trường

| Package | Cơ chế | Lưu ý |
|---|---|---|
| `frontend/` | `import.meta.env.VITE_*` | **Giá trị bị nhúng nguyên văn vào bundle** — công khai với mọi người |
| `backend/` | `process.env.*` | Chỉ tồn tại trong tiến trình Main |

- `VITE_` là bộ lọc, **không phải cơ chế bảo mật**. Bí mật phải nằm ở Backend, truy cập qua IPC.
- `.env*` trong `.gitignore`; commit `.env.example` chỉ liệt kê tên biến.
- Phân biệt môi trường bằng `app.isPackaged` (BE) và `import.meta.env.DEV` (FE), **không** dùng `process.env.NODE_ENV` — không đáng tin trong bản đóng gói.
- DevTools chỉ mở khi `!app.isPackaged`.

---

## 8. Content Security Policy

Hai chuỗi riêng, chọn theo `app.isPackaged`. Áp bằng `session.defaultSession.webRequest.onHeadersReceived`, **không** dùng thẻ `<meta>`.

| Môi trường | Yêu cầu |
|---|---|
| Development | Cho phép `http://localhost:5173` và `ws://localhost:5173` (Vite HMR cần cả hai) |
| Production | `default-src 'self'`, không `unsafe-eval`, không `unsafe-inline`, không nguồn từ xa |

Sau khi bật CSP production, mở DevTools của **bản đóng gói** ít nhất một lần — CSP chặn tài nguyên im lặng, giao diện vỡ mà không báo lỗi.

---

## 9. Môi trường Windows

`better-sqlite3` cần biên dịch native. Nếu `npm install` báo `gyp ERR!` hoặc `MSBuild.exe failed` → thiếu **Visual Studio Build Tools (Desktop development with C++)** và **Python 3**.

---

## 10. Test bản đóng gói sớm

Toàn bộ lỗi ở mục 6 **không xuất hiện lúc `npm run dev`** — chỉ lộ ra ở bản đóng gói.

**Bắt buộc**: build và cài thử lên máy sạch ngay khi Backend kết nối được SQLite (Phase 2, mục 2.1b của roadmap), rồi build lại sau mỗi phase. Để tới Phase 7 mới build lần đầu thì mọi lỗi ập đến cùng lúc.

### Checklist "build thành công"

- [ ] Cài được trên máy Windows **chưa cài Node.js**
- [ ] Mở app không màn hình trắng
- [ ] `window.api` tồn tại (kiểm bằng cách hiện version app lên UI)
- [ ] Tạo/đọc dữ liệu SQLite thành công (chứng tỏ native module nạp được)
- [ ] File DB nằm trong `%APPDATA%`, không nằm cạnh `.exe`
- [ ] Tắt mở lại — dữ liệu còn nguyên
- [ ] Cài đè bản mới lên bản cũ — migration chạy đúng, dữ liệu không mất
- [ ] Gỡ cài đặt — dữ liệu người dùng vẫn còn (hoặc có hỏi trước)
- [ ] Bản production không mở được DevTools
- [ ] Kích thước file cài 70–120MB (vượt 250MB → `electron` đang nằm nhầm ở `dependencies`)

---

## Tài liệu liên quan

- [Tổng quan kiến trúc](./overview.md)
- [Mô hình bảo mật](./security.md)
- [Khung lộ trình](../04-guidelines/phase-framework.md) — Phase 0 và Phase 7

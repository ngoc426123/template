# Nhật ký thay đổi của template

> Mỗi lần sửa một luật trong `docs/`, thêm một dòng ở đây và tăng `TEMPLATE_VERSION`.
> Dự án đã copy template biết mình tụt hậu bao nhiêu bằng cách so hai file này.

Đánh số theo [SemVer](https://semver.org/lang/vi/) với nghĩa riêng:

| Phần | Tăng khi |
|---|---|
| **MAJOR** | Đổi một quyết định nền (D01–D18) hoặc đổi cấu trúc thư mục — dự án cũ phải sửa code |
| **MINOR** | Thêm luật mới hoặc thêm file — dự án cũ nên áp dụng nhưng không gấp |
| **PATCH** | Sửa lỗi diễn đạt, thêm ví dụ, làm rõ — không ảnh hưởng code |

---

## 1.2.0

Chỉ cần copy `docs/`, không cần thêm gì ở gốc repo.

Cơ chế: luật nhận diện đặt ở `~/.claude/CLAUDE.md` (cấu hình toàn cục của máy) — file này
**được tự nạp ở mọi dự án**. Luật kiểm tra "gốc không có CLAUDE.md + có docs/bootstrap/INIT.md"
rồi chạy INIT. Hẹp, không bắn nhầm sang dự án khác.

- `README.md` §4 tách hai cách: A = luật toàn cục (copy mỗi `docs/`), B = repo tự chứa (copy thêm 1 file)
- `bootstrap/INIT.md` Bước 0 viết lại: xử lý được trường hợp gốc **chỉ có `docs/`**, tự lắp `project/` ra gốc, không cần bản mồi
- `init.sh` / `init.ps1` giữ nguyên, dùng cho cách B và cho việc dựng template repo

---

## 1.1.1

Sửa lỗi trong hướng dẫn khởi tạo ở `README.md` §4.

Bản 1.1.0 bảo "copy `docs/` rồi chạy script" — sai, vì giữa hai bước đó repo chưa có
`CLAUDE.md` ở gốc, agent mở lên không nạp gì và không biết `docs/` là gì. Người dùng cũng
không có gì nhắc để nhớ chạy script.

- §4.0 nêu thẳng luật nền: chỉ `CLAUDE.md` ở **gốc repo** được tự nạp
- Luồng chuẩn đổi thành **clone cả template repo**, không phải copy riêng `docs/`
- Template repo có `CLAUDE.md` + `.claude/` + `project/` sẵn ở gốc → dự án mới không cần chạy script
- `init.sh` / `init.ps1` giữ lại, nhưng chỉ còn hai công dụng: dựng template repo lần đầu, và lắp template vào một repo đã có sẵn

---

## 1.1.0

Thêm cơ chế khởi tạo — trước đó template là thư mục trơ, không có gì dẫn agent vào quy trình.

- `bootstrap/CLAUDE.md` — bản mồi, là file duy nhất Claude Code tự nạp. Chặn viết code khi chưa khởi tạo
- `bootstrap/INIT.md` — quy trình phỏng vấn 7 bước: nhận diện dự án → khai thác domain → điền `project/` → sinh `CLAUDE.md` thật
- `bootstrap/project/` — 8 file khung trắng
- `bootstrap/init.ps1` + `init.sh` — lắp 3 thứ trên vào đúng chỗ
- `bootstrap/init-project.md` — lối tắt `/init-project`
- `README.md` §4 viết lại theo luồng mới

---

## 1.0.0

Bản đầu tiên. Tách từ tài liệu của dự án Elecrusion.

- `docs/` thành template thuần, không còn nghiệp vụ
- Nghiệp vụ chuyển sang `project/`
- `glossary.md` → `naming-conventions.md` (bỏ §2 thuật ngữ nghiệp vụ)
- `decisions.md` → `decisions-baseline.md` (D01–D18 thành mặc định kế thừa được)
- `database-schema.md` → `database-conventions.md` (bỏ ERD và định nghĩa bảng)
- `roadmap.md` → `phase-framework.md` (danh sách việc theo domain chuyển sang `project/`)
- `ipc-communication.md` §5 chỉ còn kênh hạ tầng
- `ui-structure.md` §3 chỉ còn 5 trạng thái bắt buộc
- `state-management.md` §3.1 chỉ còn ba loại quan hệ hay bị bỏ sót
- Thêm `examples/sample-domain.md`, `CLAUDE.template.md`, `TEMPLATE_VERSION`, file này

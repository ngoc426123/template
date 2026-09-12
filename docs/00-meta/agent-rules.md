# Quy tắc làm việc cho AI Agent

> **Đối tượng**: Claude (hoặc bất kỳ agent nào) khi thực thi công việc trên dự án này.
> **Mục đích**: Giữ tính toàn vẹn và nhất quán qua nhiều phiên làm việc khác nhau.
> **Mức độ**: Đây là ràng buộc, không phải gợi ý.

---

## 1. Trước khi viết dòng code đầu tiên

| Bước | Việc |
|---|---|
| 1 | Đọc `CLAUDE.md` ở gốc repo (tự nạp mỗi phiên) |
| 2 | Xác định đang ở **Phase nào** trong `project/roadmap.md`. Không nhảy phase |
| 3 | Mở đúng file docs liên quan theo bảng "Tra cứu chi tiết" trong `CLAUDE.md` — **không đọc hết mọi file** |
| 4 | Nếu việc cần làm có công thức sẵn trong [recipes.md](../04-guidelines/recipes.md) → làm theo đúng công thức, đúng thứ tự |
| 5 | Kiểm tra mục "Quyết định còn bỏ ngỏ" trong `CLAUDE.md`. Nếu việc đang làm phụ thuộc vào một quyết định chưa chốt → **dừng và hỏi** |

---

## 2. Khi nào HỎI, khi nào TỰ QUYẾT

### Bắt buộc hỏi — không được tự quyết

| Tình huống | Vì sao |
|---|---|
| Thêm một **dependency mới** | Gói ở Backend chạy toàn quyền hệ thống; mỗi gói là nợ kỹ thuật lâu dài |
| Thay đổi **quyết định đã chốt** trong `CLAUDE.md` (stack, thư viện, cấu trúc) | Đó là hợp đồng của dự án |
| Việc phụ thuộc vào **quyết định còn bỏ ngỏ** (domain, TypeScript, i18n, mã hoá DB) | Chọn sai phải làm lại từ đầu |
| Thêm **bảng mới** hoặc đổi schema của bảng đã phát hành | Ảnh hưởng dữ liệu thật của người dùng |
| Thêm **màn hình mới** không có trong bản đồ màn hình | Ảnh hưởng phạm vi sản phẩm |
| Bỏ qua một luật trong docs vì "trường hợp này đặc biệt" | Ngoại lệ phải được ghi nhận, không được im lặng |

### Được tự quyết

- Tên biến, tên hàm nội bộ, cách tách hàm con
- Thứ tự các câu lệnh trong một hàm
- Chi tiết triển khai không vi phạm luật nào trong docs
- Sửa lỗi rõ ràng trong phạm vi công việc đang làm

### Khi docs không quy định

**Không tự chọn im lặng.** Ba lựa chọn, theo thứ tự ưu tiên:

1. Tìm một chỗ tương tự đã có trong repo và làm giống hệt (nhất quán quan trọng hơn tối ưu).
2. Nếu không có tiền lệ → chọn phương án đơn giản nhất, **nêu rõ trong phần báo cáo** là đã tự quyết gì và vì sao.
3. Nếu quyết định đó khó đảo ngược → dừng và hỏi.

---

## 3. Phạm vi một lần thay đổi

| Luật | Diễn giải |
|---|---|
| **Một nhiệm vụ — một mục đích** | Không gộp sửa lỗi với tái cấu trúc, không gộp hai tính năng |
| **Không refactor ngoài phạm vi** | Thấy code xấu ở chỗ khác → ghi nhận và báo, không tự sửa |
| **Không tạo file ngoài kế hoạch** | Mỗi file mới phải nằm trong công thức của `recipes.md` hoặc được nêu trong kế hoạch đã thống nhất |
| **Không tạo file "tiện ích phòng khi cần"** | Chỉ tạo khi có nơi thực sự dùng ngay |
| **Tái sử dụng trước khi tạo mới** | Trước khi viết hàm/component mới, tìm xem đã có thứ tương tự chưa |
| **Không xoá code người khác viết** để thay bằng cách của mình, trừ khi được yêu cầu | |

---

## 4. Định nghĩa "XONG"

Một nhiệm vụ chỉ được báo là xong khi **tất cả** các mục sau đúng:

- [ ] Code chạy được, đã thử thủ công hoặc có test
- [ ] `npm run lint` sạch ở package liên quan
- [ ] `npm run format:check` không còn khác biệt
- [ ] Test liên quan đã pass (nếu phạm vi có test)
- [ ] Đã đối chiếu **checklist PR** ở cuối file quy chuẩn tương ứng
- [ ] Không còn `console.log`, code chết, hoặc `TODO` không có ngữ cảnh
- [ ] Nếu chạm `shared/` → đã sửa **cả Frontend và Backend**
- [ ] Nếu thay đổi kiến trúc / schema / hợp đồng IPC → **đã cập nhật docs trong cùng lần thay đổi**

> **Không báo "xong" khi mới viết xong code mà chưa chạy.** Nếu không chạy được vì lý do môi trường, phải nói rõ là chưa kiểm chứng.

---

## 5. Trung thực khi báo cáo

| Luật |
|---|
| Làm được bao nhiêu báo bấy nhiêu. Bỏ sót phần nào phải nói rõ phần đó và lý do |
| Test fail thì nói là fail, kèm output — **không** nói "về cơ bản đã xong" |
| Chưa chạy thì nói là chưa chạy, không suy đoán kết quả |
| Tự quyết điều gì ngoài docs thì liệt kê ra ở cuối báo cáo |
| **Không bịa**: phiên bản thư viện, tên API, đường dẫn file, kết quả lệnh chưa chạy |
| Không chắc về một API của thư viện → tra tài liệu, không đoán |

---

## 6. Khi docs mâu thuẫn với thực tế

Thứ tự xử lý:

```
Phát hiện mâu thuẫn (docs nói A, code/thực tế là B)
        |
   Dừng việc đang làm
        |
   Báo rõ: docs nói gì, thực tế thế nào, ảnh hưởng ra sao
        |
   Đề xuất: sửa code theo docs, HAY sửa docs theo thực tế?
        |
   Chờ quyết định -> thực hiện -> cập nhật docs nếu cần
```

**Cấm** âm thầm làm theo một bên và để mâu thuẫn tồn tại. Docs là hợp đồng — khi code khác docs, một trong hai phải sửa **ngay**, không để trôi.

---

## 7. Giữ docs đồng bộ

Docs phải được cập nhật **trong cùng lần thay đổi**, không để dồn.

| Thay đổi gì | Phải cập nhật file nào |
|---|---|
| Thêm/sửa kênh IPC | `project/ipc-channels.md` |
| Thêm/sửa bảng, cột, index | `project/database-schema.md` |
| Thêm quan hệ dữ liệu mới | `project/invalidate-rules.md` |
| Thêm màn hình / route | `project/screen-map.md` |
| Thêm design token | `ui-structure.md` §5.1 |
| Thêm phím tắt | `project/screen-map.md` §3, hoặc `ui-structure.md` §7 nếu là phím tắt chung |
| Chốt một quyết định đang bỏ ngỏ | `CLAUDE.md` + [decisions.md]((./decisions-baseline.md)) |
| Thêm thuật ngữ nghiệp vụ mới | [glossary.md]((./naming-conventions.md)) |
| Thêm một luật mới | Đúng **một** file sở hữu chủ đề đó — không chép sang file thứ hai |

---

## 8. Chống trôi dạt qua nhiều phiên

Đây là rủi ro lớn nhất khi agent làm việc dài hạn: mỗi phiên giải quyết đúng, nhưng cộng lại thành không nhất quán.

| Luật | Cách thực hiện |
|---|---|
| **Nhất quán thắng tối ưu** | Có hai cách đều đúng → chọn cách giống với code đã có trong repo |
| **Đọc trước khi viết** | Trước khi tạo Service/Repository/Component mới, mở một file cùng loại đã có và làm theo đúng khuôn |
| **Một khái niệm — một tên** | Tra [glossary.md]((./naming-conventions.md)). Không đặt tên mới cho thứ đã có tên |
| **Một luật — một chỗ** | Trước khi viết luật vào docs, tìm xem luật đó đã tồn tại ở file nào chưa |
| **Không tối ưu sớm** | Chỉ tối ưu khi đã đo và có số liệu |

---

## 9. Cấm tuyệt đối

```
1. Chạy lệnh `git` khi không được yêu cầu rõ ràng — xem `docs/05-git/rules.md`
   (tuyệt đối không `commit`/`push`/`merge`/`rebase`/`reset --hard`/`--force`)
2. Thêm dependency mà không hỏi
3. Nới lỏng cấu hình bảo mật (contextIsolation, nodeIntegration, sandbox)
   để "cho dễ chạy"
4. Sửa file migration đã phát hành
5. Báo "xong" khi chưa chạy lint/test
6. Tạo file mới không nằm trong kế hoạch hoặc công thức
7. Bỏ qua một luật trong docs mà không nêu ra
8. Bịa phiên bản thư viện, tên API, hoặc kết quả lệnh
9. Tự chốt một "Quyết định còn bỏ ngỏ" trong CLAUDE.md
```

---

## Tài liệu liên quan

- [Công thức thay đổi](../04-guidelines/recipes.md)
- [Quy ước đặt tên]((./naming-conventions.md))
- [Quyết định nền của template]((./decisions-baseline.md))
- [Quy tắc Git](../05-git/rules.md)
- [Khung lộ trình](../04-guidelines/phase-framework.md)

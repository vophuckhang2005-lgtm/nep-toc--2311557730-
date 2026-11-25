# SoraHome Workspace Rules

## Auto-Sync Git & Vercel After Coding
- Sau khi hoàn tất mọi chỉnh sửa code hoặc cấu hình trong `SoraHome` (và đã kiểm tra xong thay đổi), **luôn tự động đồng bộ từ Git lên Vercel** trước khi kết thúc tác vụ, trừ khi người dùng yêu cầu giữ lại ở local.
- Không bao giờ commit hoặc push các file nhạy cảm (`.env`, `.env.local`, khóa bí mật).
- Thực hiện theo quy trình của skill `git-vercel-sync`: kiểm tra `git status` → `git add` → `git commit` → `git push origin main` → kiểm tra/đồng bộ triển khai trên Vercel.

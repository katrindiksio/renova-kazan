@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js не найден. Установите версию LTS с https://nodejs.org и запустите этот файл снова.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Устанавливаю зависимости. Это займёт пару минут, только при первом запуске...
  call npm install
  if errorlevel 1 (
    echo Не удалось установить зависимости.
    pause
    exit /b 1
  )
)

echo Запускаю сайт. Он откроется в браузере через несколько секунд.
echo Чтобы остановить, закройте это окно или нажмите Ctrl+C.
start "" cmd /c "timeout /t 10 /nobreak >nul & start http://localhost:47213"
call npm run dev -- -p 47213
pause

## Comandos para Subir tus Archivos

### 1. Clonar el repositorio

    git clone https://github.com/deymarFlores/SAMI-RFID

### 2. Crear una nueva rama 

    git checkout -b feature/1-Init-proyect

### 3. Realiza los cambios en el codigo

Para este punto toca avanzar en el código o realizar cambios que se desee 

### 4. Agregar los cambios al área de preparación (staging)

    git add archive.txt

### 4.5 Agregar cambios globales

    git add .

### 5. Hacer commit con un mensaje descriptivo

    git commit -m "feature: Se realizaron cambios ..."

### 5.5. Hacer commit a un issue

    git commit -m "feature: Se realizaron cambios ... issue (#1)"

### 6. Subir la rama al repositorio remoto

    git push origin feature/1-Init-proyect
---
### 7. Actualizar el repositorio

    git pull origin main

from PIL import Image
import pytesseract
import cv2

pytesseract.pytesseract.tesseract_cmd = "/opt/homebrew/bin/tesseract"

def run_tesseract(image_path):
    img = cv2.imread(image_path)

    # 🔧 preprocessing (IMPORTANT)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)

    # convert back to PIL
    pil_img = Image.fromarray(thresh)

    text = pytesseract.image_to_string(pil_img, config='--psm 6')

    return text.strip()
import easyocr

reader = easyocr.Reader(['en'])

def run_easyocr(image_path):
    result = reader.readtext(image_path, detail=0)
    return " ".join(result)
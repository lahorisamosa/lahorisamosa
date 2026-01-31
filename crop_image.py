from PIL import Image
import os

source_path = r"D:\My Project\lahori-samosa-website\public\images\hero\heroimage.webp"
target_path = r"D:\My Project\lahori-samosa-website\public\images\hero\hero-mobile.webp"

try:
    with Image.open(source_path) as img:
        print(f"Original dimensions: {img.size}")
        width, height = img.size
        
        # Target aspect ratio 9:16
        target_ratio = 9/16
        current_ratio = width / height
        
        if current_ratio > target_ratio:
            # Image is too wide, crop width
            new_width = int(height * target_ratio)
            new_height = height
            left = (width - new_width) // 2
            top = 0
            right = left + new_width
            bottom = new_height
        else:
            # Image is too tall, crop height (unlikely for hero image)
            new_width = width
            new_height = int(width / target_ratio)
            left = 0
            top = (height - new_height) // 2
            right = width
            bottom = top + new_height
            
        print(f"Cropping to: {new_width}x{new_height}")
        img_cropped = img.crop((left, top, right, bottom))
        
        img_cropped.save(target_path, "WEBP", quality=90)
        print(f"Saved to {target_path}")

except Exception as e:
    print(f"Error: {e}")

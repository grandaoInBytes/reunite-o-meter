import os
from PIL import Image  # 🔹 added for compression

# TODO: figure out why one pic was resized wrongly (maybe the initial format was different)
def rename_and_compress_images(folder_path, new_name_prefix="images", start_index=1, quality=80):
    """
    Renames and compresses all image files in a specified folder to a sequential format
    (e.g., images1.jpg, images2.jpg).

    Args:
        folder_path (str): The path to the folder containing the images.
        new_name_prefix (str): The prefix for the new file names (e.g., "images" will result in images1.jpg).
        start_index (int): The starting number for the sequential naming (e.g., 1 for images1.jpg).
        quality (int): JPEG quality for compression (1-100, higher is better quality).
    """
    if not os.path.isdir(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist.")
        return

    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp')
    image_files = []

    # Collect image files
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path) and filename.lower().endswith(image_extensions):
            image_files.append(file_path)

    image_files.sort()
    print(f"Found {len(image_files)} image files in '{folder_path}'.")

    if not image_files:
        print("No image files found with supported extensions. Exiting.")
        return

    for i, old_file_path in enumerate(image_files):
        new_filename = f"{new_name_prefix}{start_index + i}.jpg"  # 🔹 always output as .jpg
        new_file_path = os.path.join(folder_path, new_filename)

        try:
            with Image.open(old_file_path) as img:
                img = img.convert("RGB")  # 🔹 ensure consistent JPEG format
                #img.thumbnail((1920, 1920))  # optional resize (keeps aspect ratio)
                img.save(new_file_path, "JPEG", quality=quality, optimize=True)

            # remove old file if different from new one
            if old_file_path != new_file_path:
                os.remove(old_file_path)

            print(f"Compressed & renamed '{os.path.basename(old_file_path)}' → '{new_filename}'")
        except Exception as e:
            print(f"Error processing '{os.path.basename(old_file_path)}': {e}")

# --- How to use the script ---
if __name__ == "__main__":
    image_folder = 'images'  # Adjust path if needed
    rename_and_compress_images(image_folder, new_name_prefix="image", start_index=1, quality=80)
    print("\nRenaming & compression complete!")

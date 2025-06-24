import os

def rename_images_sequentially(folder_path, new_name_prefix="images", start_index=1):
    """
    Renames all image files in a specified folder to a sequential format (e.g., images1.jpg, images2.jpg).

    Args:
        folder_path (str): The path to the folder containing the images.
        new_name_prefix (str): The prefix for the new file names (e.g., "images" will result in images1.jpg).
        start_index (int): The starting number for the sequential naming (e.g., 1 for images1.jpg).
    """
    if not os.path.isdir(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist.")
        return

    # Supported image extensions (you can add more if needed)
    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp')
    
    # List to store paths of image files found
    image_files = []

    # Collect all image files
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path) and filename.lower().endswith(image_extensions):
            image_files.append(file_path)

    # Sort files to ensure consistent renaming order (e.g., by original name)
    # This is important if you care about which original file becomes which new sequential name
    image_files.sort() 

    print(f"Found {len(image_files)} image files in '{folder_path}'.")

    if not image_files:
        print("No image files found with supported extensions. Exiting.")
        return

    # Rename the files
    for i, old_file_path in enumerate(image_files):
        # Get the original file extension
        _, ext = os.path.splitext(old_file_path)
        
        # Construct the new filename
        new_filename = f"{new_name_prefix}{start_index + i}{ext}"
        new_file_path = os.path.join(folder_path, new_filename)

        try:
            os.rename(old_file_path, new_file_path)
            print(f"Renamed '{os.path.basename(old_file_path)}' to '{new_filename}'")
        except OSError as e:
            print(f"Error renaming '{os.path.basename(old_file_path)}': {e}")

# --- How to use the script ---
if __name__ == "__main__":
    # IMPORTANT: Replace 'path/to/your/images' with the actual path to your image folder.
    # For example, if your images are in a folder named 'my_photos' in the same directory as the script:
    # image_folder = 'my_photos'
    # If they are in a specific path like on Windows:
    # image_folder = 'C:\\Users\\YourUser\\Pictures\\VacationPhotos'
    # Or on macOS/Linux:
    # image_folder = '/Users/YourUser/Pictures/VacationPhotos'
    
    image_folder = 'images' # Assuming 'images' folder is in the same directory as this script

    # Call the function to rename images
    rename_images_sequentially(image_folder, new_name_prefix="image", start_index=1)
    
    print("\nRenaming process complete!")
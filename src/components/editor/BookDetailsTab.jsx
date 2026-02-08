import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { UploadCloud } from "lucide-react";
import { BASE_URL } from "../../utils/apiPaths";

const BookDetailsTab = ({
  book,
  onBookChange,
  onCoverUpload,
  isUploading,
  fileInputRef,
}) => {
  // Construct the correct image URL with better null/empty checking
  let coverImageUrl = "";

  if (book.coverImage && book.coverImage.trim() !== "") {
    if (book.coverImage.startsWith("http")) {
      coverImageUrl = book.coverImage;
    } else {
      // Ensure path starts with /Backend/ if it doesn't already
      const path = book.coverImage.startsWith("/")
        ? book.coverImage
        : `/${book.coverImage}`;
      const normalizedPath = path.startsWith("/Backend")
        ? path
        : `/Backend${path}`;
      coverImageUrl = `${BASE_URL}${normalizedPath}`.replace(
        /([^:]\/)\/+/g,
        "$1",
      );
    }
  }

  // console.log("===== COVER IMAGE DEBUG =====");
  // console.log("Book object:", book);
  // console.log("Cover Image Path:", book.coverImage);
  // console.log(
  //   "Has cover image?",
  //   !!book.coverImage && book.coverImage.trim() !== "",
  // );
  // console.log("Constructed URL:", coverImageUrl);
  // console.log("BASE_URL:", BASE_URL);
  // console.log("============================");
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-900">
          Book Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Title"
            name="title"
            value={book.title}
            onChange={onBookChange}
          />
          <InputField
            label="Author"
            name="author"
            value={book.author}
            onChange={onBookChange}
          />
          <div className="md:col-span-2">
            <InputField
              label="Subtitle"
              name="subtitle"
              value={book.subtitle || ""}
              onChange={onBookChange}
            />
          </div>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-8">
        <h3 className="text-lg font-semibold mb-4 text-slate-900">
          Cover Image
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          {book.coverImage ? (
            <img
              src={coverImageUrl}
              alt="Book Cover"
              className="w-32 h-48 object-cover rounded-lg bg-slate-100 shadow"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"%3E%3Crect width="200" height="300" fill="%23f1f5f9"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8"%3ENo Image%3C/text%3E%3C/svg%3E';
              }}
            />
          ) : (
            <div className="w-32 h-48 flex items-center justify-center bg-slate-100 rounded-lg shadow">
              <span className="text-slate-400 text-sm">No Image</span>
            </div>
          )}
          <div>
            <p className="text-slate-600 text-sm mt-2 mb-4">
              Upload a new cover image. Recommended size: 600x800px.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onCoverUpload}
              className="hidden"
              accept="image/*"
            />
            <Button
              variant="secondary"
              icon={UploadCloud}
              isLoading={isUploading}
              onClick={() => fileInputRef.current.click()}
            >
              Upload Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsTab;

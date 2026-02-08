import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        ></div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full p-8 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200 p-2 group"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

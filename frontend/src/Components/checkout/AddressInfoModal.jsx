import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { FaTimes } from "react-icons/fa"

const AddressInfoModal = ({open, setOpen, children}) => {
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="relative w-full max-w-md mx-auto transform overflow-hidden bg-white rounded-md shadow-xl transition-all">
            <div className="px-6 py-6">
                {children}
            </div>
            <div className="flex justify-end gap-4 absolute right-4 top-4">
                <button onClick={() => setOpen(false)} type="button" >
                    <FaTimes className="text-slate-700" size={25} />
                </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default AddressInfoModal

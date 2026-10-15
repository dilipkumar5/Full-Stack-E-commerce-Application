import { useState } from 'react';
import { FaAddressBook } from 'react-icons/fa';
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { DeleteAddressModal } from './DeleteAddressModal';
import toast from 'react-hot-toast';
import { deleteUserAddress } from '../../store/actions';
import Skeleton from '../shared/Skeleton';

const AddressInfo = ({ address }) => {

    const dispatch = useDispatch();

    const noAddressExist = !address || address.length===0 ;
    const { isLoading, btnLoader } = useSelector((state) => state.errors);

    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");

    const addNewAddressHandler = () => {
        setSelectedAddress("");
        setOpenAddressModal(true);
    }
    const deleteAddressHandler = () => {
        dispatch(deleteUserAddress(
            toast,
            selectedAddress?.addressId,
            setOpenDeleteModal
        ));
    }
    return (
        <div className="pt-4">
            {noAddressExist ? (
                <div className="p-6 rounded-lg msx-w-md mx-auto flex flex-col items-center justify-center">
                    <FaAddressBook size={50} className="text-gray-500 mb-4"/>
                    <h1 className="mb-2 text-slate-900 text-center font-semibold text-2xl">
                        No Address added yet
                    </h1>
                    <h1 className="mb-6 text-slate-500 text-center">
                        Please add your addess to complete the purchase
                    </h1>
                    <button
                        onClick={addNewAddressHandler}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition cursor-pointer">
                        Add Address
                    </button>
                </div>
            ) : (
                <div className="relative p-6 rounded-lg max-w-md mx-auto">
                    <h1 className="text-slate-800 text-center font-bold text-2xl">
                        Select Address
                    </h1>

                    {isLoading ? (
                        <div className="max-w-md mx-auto pt-6">
                            <Skeleton/>
                        </div>
                        ) : (
                            <>
                                <div className="space-y-4 pt-6">
                                    <AddressList 
                                        addresses={address}
                                        setSelectedAddress={setSelectedAddress}
                                        setOpenAddressModal={setOpenAddressModal}
                                        setOpenDeleteModal={setOpenDeleteModal}
                                        />
                                </div>
                                
                                {address.length > 0 && (
                                    <div className="mt-4 ">
                                        <button 
                                            onClick={addNewAddressHandler}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition cursor-pointer"
                                                >
                                                    Add Address
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                </div>
            )}

            <AddressInfoModal
                open={openAddressModal}
                setOpen = {setOpenAddressModal}
                >
                    <AddAddressForm
                        address={selectedAddress}
                        setOpenAddressModal={setOpenAddressModal}/>
             </AddressInfoModal>

             <DeleteAddressModal
                open={openDeleteModal}
                loader={btnLoader}
                setOpen={setOpenDeleteModal}
                title="Delete Address"
                onDeleteHandler = {deleteAddressHandler}
                />

        </div>
    )
}

export default AddressInfo

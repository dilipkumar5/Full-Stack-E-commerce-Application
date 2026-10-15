
import Spinners from "../Spinners"
import InputField from "../shared/InputField"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FaAddressCard } from "react-icons/fa";
import toast from "react-hot-toast";
import { addUpdateUserAddress} from "../../store/actions"
import { useEffect } from "react";

const AddAddressForm = ({address, setOpenAddressModal}) => {
    const dispatch = useDispatch();
    const { btnLoader } = useSelector((state) => state.errors);
    const{
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {
            errors
        }
    } = useForm({
        mode: "onTouched"
    });

    const onSaveAddressHandler = async (data) => {
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal
        ))
    }

    useEffect(() => {
        if(address?.addressId){
            setValue("buildingName", address?.buildingName);
            setValue("street", address?.street);
            setValue("city", address?.city);
            setValue("stateName", address?.stateName);
            setValue("zipcode", address?.zipcode);
            setValue("country", address?.country);
        }
    }, [address]);

    return (
            <div className="">
                <form
                    onSubmit={handleSubmit(onSaveAddressHandler)}
                    className="">
                        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                            <FaAddressCard className="mr-2 text-2xl"/>
                            {!address?.addressId
                            ? `Add Address`
                            : `Edit Address`}
                            
                        </div>
                        <div className="flex flex-col gap-4">
                            <InputField
                                label="Building Name"
                                required
                                id="buildingName"
                                type="text"
                                message="*Building name is required"
                                placeholder="Enter building name"
                                register={register}
                                errors={errors}
                                />

                            <InputField
                                label="Street"
                                required
                                id="street"
                                type="text"
                                message="*street is required"
                                placeholder="Enter street"
                                register={register}
                                errors={errors}
                                />

                            <InputField
                                label="City"
                                required
                                id="city"
                                type="text"
                                message="*City name is required"
                                placeholder="Enter city"
                                register={register}
                                errors={errors}
                                />

                            <InputField
                                label="State"
                                required
                                id="stateName"
                                type="text"
                                message="*State name is required"
                                placeholder="Enter state"
                                register={register}
                                errors={errors}
                                />

                            <InputField
                                label="zipcode"
                                required
                                id="zipcode"
                                type="text"
                                message="*zipcode is required"
                                placeholder="Enter zipcode"
                                register={register}
                                errors={errors}
                                />

                            <InputField
                                label="Country"
                                required
                                id="country"
                                type="text"
                                message="*country is required"
                                placeholder="Enter country"
                                register={register}
                                errors={errors}
                                />
                        </div>
                        <button
                            disabled={btnLoader}
                            className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4"
                            type="submit"
                            >
                                {btnLoader ? (
                                    <>
                                        <Spinners/> Loading...
                                    </>
                                ) : (
                                    <>Save</>
                                )}
                        </button>
                        
                </form>
            </div>
    )
}

export default AddAddressForm

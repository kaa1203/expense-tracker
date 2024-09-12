import { useSelector } from "react-redux";
import { selectShowModal, selectModalType, selectModalData } from "../redux/modal/selector";

export const useModal = () => {
   const showModal = useSelector(selectShowModal);
   const modalType = useSelector(selectModalType);
   const modalData = useSelector(selectModalData);

   return { showModal, modalType, modalData };
}
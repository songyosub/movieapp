import { useRecoilState } from "recoil";
import { modalState } from "../state/Atoms";

const useModal = () => {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  const openModal = (movie) => {
    setModalInfo({ isOpen: true, movie })
  };

  const closeModal = () => {
    setModalInfo((prev) => ({ ...prev, isOpen: false }));
  }

  return { openModal, closeModal, modalInfo };
};

export default useModal;
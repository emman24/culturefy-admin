import { useContext, useMemo } from 'react';
import { DrawerContext } from 'src/@core/context/DrawerContext';

const useToggleDrawer = () => {

  const {
    serviceId,
    toggleDrawer, isDrawerOpen,
    toggleModal, isModalOpen,
    toggleView, view
  } = useContext(DrawerContext);

  const handleDrawer = (id: string | null) => toggleDrawer(id)

  const handleModal = (id: string | null) => toggleModal(id)

  // useEffect(() => {
  //   if (!isDrawerOpen) {
  //     setServiceId(null);
  //   }
  // }, [isDrawerOpen]);
  // useMemo(() => {
  // }, [serviceId, isDrawerOpen, isModalOpen])
  
  return {
    serviceId,

    isDrawerOpen,
    isModalOpen,

    handleDrawer,
    handleModal,

    view,
    toggleView,
  };
};

export default useToggleDrawer;

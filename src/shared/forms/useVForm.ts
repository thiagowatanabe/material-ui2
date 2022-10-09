import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";

export const useVForm = () => {

    const formRef = useRef<FormHandles>(null);


    const IsSaveAndNew = useRef(false);
    const IsSaveAndClose = useRef(false);


    const handleSave = useCallback(() => {
        console.log('handleSave')
        IsSaveAndNew.current = false;
        IsSaveAndClose.current = false;
        formRef.current?.submitForm();
    } , []);
    
    const handleSaveAndNew = useCallback(() => {
        IsSaveAndNew.current = true;
        IsSaveAndClose.current = false;
        formRef.current?.submitForm();
    } , []);
    
    const handleSaveAndClose = useCallback(() => {
        IsSaveAndNew.current = false;
        IsSaveAndClose.current = true;
        formRef.current?.submitForm();
    } , []);



    const handleIsSaveAndNew = useCallback(() => {
        return IsSaveAndNew.current;
    } , []);
    const handleIsSaveAndClose = useCallback(() => {
        return IsSaveAndClose.current;
    } , []);

    return {
        formRef,

        save: handleSave,
        saveAndNew: handleSaveAndNew,
        saveAndClose: handleSaveAndClose,
        isSaveAndNew: handleIsSaveAndNew,
        isSaveAndClose: handleIsSaveAndClose,
        
    };

}
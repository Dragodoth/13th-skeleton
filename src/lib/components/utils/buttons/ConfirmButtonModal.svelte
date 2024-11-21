<script lang="ts">
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";

    interface Props {
        title: string;
        handleConfirm: Function;
        buttonCSS: string;
        buttonIconCSS: string;
        buttonText: string;
    }

    const {
        title,
        handleConfirm,
        buttonCSS,
        buttonIconCSS,
        buttonText,
    }: Props = $props();

    const modalStore = getModalStore();

    function handleRemoveCombatantsClick() {
        new Promise<boolean>((resolve) => {
            const modal: ModalSettings = {
                type: "confirm",
                // Data
                title: title,
                body: "This cannot be undone.",
                // TRUE if confirm pressed, FALSE if cancel pressed
                response: (r: boolean) => resolve(r),
            };
            modalStore.trigger(modal);
        }).then((r: boolean) => {
            if (r) {
                handleConfirm();
            }
        });
    }
</script>

<button
    type="button"
    class="btn {buttonCSS}"
    onclick={handleRemoveCombatantsClick}>
    <span><i class={buttonIconCSS}></i></span>
    <span>{buttonText}</span>
</button>

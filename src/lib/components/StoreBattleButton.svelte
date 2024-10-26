<script>
    import {getModalStore} from "@skeletonlabs/skeleton";
    import {battleStorage, battle} from "$lib/stores.ts";
    import ModalSaveBattleForm from "$lib/components/ModalSaveBattleForm.svelte";

    const modalComponent = {ref: ModalSaveBattleForm};


    const modalStore = getModalStore();

    function handleSaveClick() {

        if ($battleStorage.find(i => i.id === $battle.id)){

        }

        new Promise((resolve) => {
            // const modal = {
            //     type: 'prompt',
            //     title: 'Enter Battle Name',
            //     body: 'Provide your battle name in the field below.',
            //     value: 'Skeleton Battle',
            //     valueAttr: {type: 'text', minlength: 3, maxlength: 20, required: true},
            //     response: (r) => {
            //         resolve(r);
            //     }
            // };
            const modal = {
                type: 'component',
                component: modalComponent,
                response: (r) => {
                    resolve(r);
                }
            };
            modalStore.trigger(modal);
        })
            .then((r) => {
                if (r) {
                    battleStorage.storeBattle($battle, r.name, r.description);
                    console.log($battleStorage);
                }
            })
            .catch((error) => {
                console.error("Error with modal:", error);
            });
    }
</script>


<button type="button" class="btn btn-sm variant-filled-success" on:click={() => handleSaveClick ()}>
    <span><i class="fa-solid fa-briefcase"/></span>
    <span>Store Battle</span>
</button>
<template>
    <CBox>
        <CButton @click="open" width="100%"><CIcon name="add"/></CButton>
        <c-modal
        :is-open="isOpen"
        :on-close="close"
        >
            <form class="form-work" @submit="submit($event)">
                <c-modal-content ref="content">
                    <c-modal-header>Add a work</c-modal-header>
                    <c-modal-close-button />
                    <c-modal-body>
                            <c-stack spacing="3">
                                <c-form-control>
                                    <c-form-label for="title">Your work's title</c-form-label>
                                    <c-input required type="title" id="title" aria-describedby="title-helper-text" v-model="title" placeholder="Hello - Music Video" />
                                    <c-form-helper-text id="title-helper-text">
                                        It will be shared on your profile
                                    </c-form-helper-text>
                                </c-form-control>
                                <template v-if="!modifying">
                                    <c-form-control>
                                        <c-form-label for="thumbnail">A thumbnail for your work</c-form-label>
                                        <input required type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                                    </c-form-control>
                                </template>
                                <c-form-control>
                                    <c-form-label for="url">A direct link to your work</c-form-label>
                                    <c-input required type="url" id="url" aria-describedby="url-helper-text" v-model="url" placeholder="https://www.youtube.com/watch?v=FRmQDItWXEc" />
                                    <c-form-helper-text id="title-helper-text">
                                        A YouTube video, a picture, an Instagram post
                                    </c-form-helper-text>
                                </c-form-control>
                            </c-stack>
                    </c-modal-body>
                    <c-modal-footer>
                    <template v-if="!submitted">
                        <c-button variant-color="blue" mr="3" type="submit">Add it</c-button>
                    </template>
                    <template v-else>
                        <c-button variant-color="blue" mr="3" is-loading loading-text="Submitting"></c-button>
                    </template>
                    <c-button @click="close">Cancel</c-button>
                    </c-modal-footer>
                </c-modal-content>
            </form>
            <c-modal-overlay />
        </c-modal>
    </CBox>
</template>

<script>
import {
  CModal,
  CModalOverlay,
  CModalContent,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton,
  CIcon,
  CBox,
  CButton,
  CInput,
  CFormControl,
  CFormLabel,
  //CFormErrorMessage,
  CFormHelperText,
  CStack
} from "@chakra-ui/vue";
export default {
    components: {
        CModal,
        CModalOverlay,
        CModalContent,
        CModalHeader,
        CModalFooter,
        CModalBody,
        CModalCloseButton,
        CIcon,
        CBox,
        CButton,
        CInput,
        CFormControl,
        CFormLabel,
        //CFormErrorMessage,
        CFormHelperText,
        CStack
    },
    data () {
        return {
            isOpen: false,
            title: null,
            thumbnail: null,
            url: null,
            submitted: false
        }
    },
    methods: {
        open() {
            this.isOpen = true
        },
        close() {
            this.isOpen = false
        },
        handleFileUpload(){
            this.thumbnail = this.$refs.file.files[0];
        },
        async submit(event){
            event.preventDefault();
            if(!this.thumbnail) return;
            if(!this.url || this.url.trim() === "") return;
            if(!this.title || this.title.trim() === "") return;
            this.submitted = true;
            const res = await this.addWork(this.thumbnail, this.url, this.title);
            if(res.status === 200){
                this.submitted = false;
                this.close();
                this.$emit("addCard", res.data);
            }
        }
    },
    props: {
        addWork: Function,
        modifying: Boolean
    }
}
</script>
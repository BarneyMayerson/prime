<script setup>
import { ref } from "vue";
import { useForm } from "@inertiajs/vue3";
import ActionMessage from "@/Components/ActionMessage.vue";
import ActionSection from "@/Components/ActionSection.vue";
import FormSection from "@/Components/FormSection.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import SectionBorder from "@/Components/SectionBorder.vue";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const props = defineProps({
  tokens: Array,
  availablePermissions: Array,
  defaultPermissions: Array,
});

const createApiTokenForm = useForm({
  name: "",
  permissions: props.defaultPermissions,
});

const updateApiTokenForm = useForm({
  permissions: [],
});

const deleteApiTokenForm = useForm({});

const displayingToken = ref(false);
const managingPermissionsFor = ref(null);
const apiTokenBeingDeleted = ref(null);

const createApiToken = () => {
  createApiTokenForm.post(route("api-tokens.store"), {
    preserveScroll: true,
    onSuccess: () => {
      displayingToken.value = true;
      createApiTokenForm.reset();
    },
  });
};

const manageApiTokenPermissions = (token) => {
  updateApiTokenForm.permissions = token.abilities;
  managingPermissionsFor.value = token;
};

const updateApiToken = () => {
  updateApiTokenForm.put(
    route("api-tokens.update", managingPermissionsFor.value),
    {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => (managingPermissionsFor.value = null),
    },
  );
};

const confirmApiTokenDeletion = (token) => {
  apiTokenBeingDeleted.value = token;
};

const deleteApiToken = () => {
  console.log("here: ", apiTokenBeingDeleted.value);
  deleteApiTokenForm.delete(
    route("api-tokens.destroy", apiTokenBeingDeleted.value),
    {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        apiTokenBeingDeleted.value = null;
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "API Token has been deleted.",
          life: 4000,
        });
      },
    },
  );
};

const confirmDeleteApiToken = (token) => {
  confirm.require({
    header: "Delete API Token",
    message: "Are you sure you would like to delete this API token?",
    icon: "pi pi-exclamation-triangle",
    position: "top",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: () => {
      apiTokenBeingDeleted.value = token;

      deleteApiToken();
    },
  });
};
</script>

<template>
  <div>
    <!-- Generate API Token -->
    <FormSection @submitted="createApiToken">
      <template #title> Create API Token </template>

      <template #description>
        API tokens allow third-party services to authenticate with our
        application on your behalf.
      </template>

      <template #form>
        <!-- Token Name -->
        <div class="col-span-6 sm:col-span-4">
          <InputLabel for="name" value="Name" />
          <InputText
            id="name"
            v-model="createApiTokenForm.name"
            class="mt-1 block w-full"
            autofocus
          />
          <InputError :message="createApiTokenForm.errors.name" class="mt-2" />
        </div>

        <!-- Token Permissions -->
        <div v-if="availablePermissions.length > 0" class="col-span-6">
          <InputLabel for="permissions" value="Permissions" />

          <div class="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div v-for="permission in availablePermissions" :key="permission">
              <label class="flex items-center">
                <Checkbox
                  v-model="createApiTokenForm.permissions"
                  :value="permission"
                />
                <span class="ms-2 text-sm">{{ permission }}</span>
              </label>
            </div>
          </div>
        </div>
      </template>

      <template #actions>
        <ActionMessage :on="createApiTokenForm.recentlySuccessful" class="me-3">
          Created.
        </ActionMessage>

        <Button
          type="submit"
          :class="{ 'opacity-25': createApiTokenForm.processing }"
          :disabled="createApiTokenForm.processing"
        >
          Create
        </Button>
      </template>
    </FormSection>

    <div v-if="tokens.length > 0">
      <SectionBorder />

      <!-- Manage API Tokens -->
      <div class="mt-10 sm:mt-0">
        <ActionSection>
          <template #title> Manage API Tokens </template>

          <template #description>
            You may delete any of your existing tokens if they are no longer
            needed.
          </template>

          <!-- API Token List -->
          <template #content>
            <div class="space-y-6">
              <div
                v-for="token in tokens"
                :key="token.id"
                class="flex items-center justify-between"
              >
                <div class="break-all">
                  {{ token.name }}
                </div>

                <div class="ms-2 flex items-center">
                  <div v-if="token.last_used_ago" class="text-sm text-gray-400">
                    Last used {{ token.last_used_ago }}
                  </div>

                  <button
                    v-if="availablePermissions.length > 0"
                    class="ms-6 cursor-pointer text-sm underline"
                    @click="manageApiTokenPermissions(token)"
                  >
                    Permissions
                  </button>

                  <button
                    class="ms-6 cursor-pointer text-sm text-red-500"
                    @click="confirmDeleteApiToken(token)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </template>
        </ActionSection>
      </div>
    </div>

    <!-- Token Value Modal -->
    <Dialog
      v-model:visible="displayingToken"
      modal
      header="API Token"
      :style="{ width: '32rem' }"
      @close="displayingToken = false"
    >
      <div>
        Please copy your new API token. For your security, it won't be shown
        again.
      </div>

      <div
        v-if="$page.props.jetstream.flash.token"
        class="mt-4 break-all rounded bg-gray-100 px-4 py-2 font-mono text-sm text-gray-500"
      >
        {{ $page.props.jetstream.flash.token }}
      </div>

      <template #footer>
        <Button severity="secondary" @click="displayingToken = false">
          Close
        </Button>
      </template>
    </Dialog>

    <!-- API Token Permissions Modal -->
    <Dialog
      v-model:visible="managingPermissionsFor"
      modal
      header="API Token Permissions"
      :style="{ width: '26rem' }"
      @close="managingPermissionsFor = null"
    >
      <p class="mb-8 block">
        Token name:
        <span class="font-bold">{{ managingPermissionsFor.name }}</span>
      </p>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="permission in availablePermissions" :key="permission">
          <label class="flex items-center">
            <Checkbox
              v-model="updateApiTokenForm.permissions"
              :value="permission"
            />
            <span class="ms-2 text-sm">{{ permission }}</span>
          </label>
        </div>
      </div>

      <template #footer>
        <Button severity="secondary" @click="managingPermissionsFor = null">
          Cancel
        </Button>

        <Button
          :class="{ 'opacity-25': updateApiTokenForm.processing }"
          :disabled="updateApiTokenForm.processing"
          @click="updateApiToken"
        >
          Save
        </Button>
      </template>
    </Dialog>

    <!-- Delete Token Confirm Dialog -->
    <ConfirmDialog />

    <Toast position="bottom-right" />
  </div>
</template>

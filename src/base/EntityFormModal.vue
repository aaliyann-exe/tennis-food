<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div
      class="bg-white rounded-2xl overflow-y-auto shadow-2xl flex flex-col w-[56vw] max-h-[96vh]"
    >
      <div
        class="flex items-center justify-between px-8 py-6 border-b border-gray-100 top-0 bg-white z-10"
      >
        <h1 class="text-4xl text-gray-800 font-semibold gap-2 flex items-end">
          {{ mode === 'add' ? title + ' ' + $t('table.information') : initialData.name
          }}<span v-if="mode === 'edit'" class="text-xl">( Edit )</span>
        </h1>
        <button @click="$emit('close')">
          <i
            class="pi pi-times text-gray-400 hover:text-gray-600 cursor-pointer transition-all duration-300"
            style="font-size: x-large"
          ></i>
        </button>
      </div>

      <hr class="mx-6 opacity-20" />

      <div class="px-8 py-6 flex-1">
        <div v-if="showAvatar" class="mb-8 flex flex-col items-center sm:items-start">
          <div class="relative inline-block hover:opacity-80 duration-300 transition-all">
            <div
              @click="triggerImageUpload"
              class="w-20 h-20 rounded-full text-center bg-orange-500 flex justify-center items-center text-white text-2xl font-bold shadow-md overflow-hidden cursor-pointer"
            >
              <img
                v-if="formData.image"
                :src="formData.image"
                class="w-full h-full object-cover"
                alt="Profile Picture"
              />
              <span v-else>{{ getInitials }}</span>

              <div
                v-if="mode !== 'view'"
                class="text-center flex absolute top-16 bg-white rounded-full p-1 shadow-sm border border-gray-100 z-10"
              >
                <i class="pi pi-camera text-orange-500 text-xs"></i>
              </div>

              <input
                type="file"
                ref="fileInputRef"
                class="hidden"
                accept="image/*"
                @change="handleImageUpload"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <template v-for="(field, index) in fields" :key="index">
            <!-- Divider logic stays the same -->
            <div v-if="field.type === 'divider'" class="col-span-1 md:col-span-2 mt-4 mb-1">
              <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
                {{ field.label }}
                <span v-if="field.subtext" class="text-xs text-orange-500 font-medium">
                  {{ field.subtext }}
                </span>
              </h3>
            </div>

            <!-- Updated wrapper logic -->
            <div v-else :class="[field.colSpan === 2 ? 'col-span-1 md:col-span-2' : 'col-span-1']">
              <InputDropdown
                v-if="field.type === 'select'"
                v-model="formData[field.key]"
                :label="field.label"
                :placeholder="field.placeholder"
                :icon="field.icon"
                :options="field.options"
                :required="field.required"
                :disabled="mode === 'view'"
              />
              <InputSimple
                v-else
                v-model="formData[field.key]"
                :label="field.label"
                :type="field.type"
                :placeholder="field.placeholder"
                :icon="field.icon"
                :required="field.required"
                :disabled="mode === 'view'"
              />
            </div>
          </template>
        </div>
      </div>

      <div
        v-if="mode !== 'view'"
        class="px-8 py-5 border-t border-gray-100 flex justify-start gap-3 bg-white z-10 cursor-pointer"
      >
        <button
          @click="$emit('close')"
          class="w-full px-10 py-3 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium transition-colors cursor-pointer duration-300"
        >
          {{ $t('table.cancel') }}
        </button>
        <button
          @click="handleSave"
          class="w-full px-10 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-sm transition-colors cursor-pointer duration-300"
        >
          {{ $t('table.save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import InputSimple from './InputSimple.vue'
import InputDropdown from './InputDropdown.vue'
import PrimeVueDropdown from './PrimeVueDropdown.vue'

const props = defineProps({
  isOpen: Boolean,
  mode: {
    type: String,
    default: 'add',
  },
  title: String,
  showAvatar: {
    type: Boolean,
    default: true,
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
  fields: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['close', 'save'])
const formData = ref({})
const fileInputRef = ref(null)

// Sync initial data when modal opens
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      formData.value = { ...props.initialData }
    }
  },
)

const getInitials = computed(() => {
  if (formData.value.name) return formData.value.name.substring(0, 2).toUpperCase()
  if (formData.value.fName)
    return `${formData.value.fName.charAt(0)}${formData.value.lName?.charAt(0) || ''}`.toUpperCase()
  return 'TF'
})

// Simulates a click on the hidden file input
const triggerImageUpload = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

// Grabs the selected file and turns it into a storable format
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    // Save the image data string directly into our form data
    formData.value.image = e.target.result
  }

  // Convert the image file to a Base64 string
  reader.readAsDataURL(file)

  // Clear the input so you can upload the same file again if you wanted to change your mind
  event.target.value = ''
}

const handleSave = () => {
  // basic validation logic can go here
  emit('save', formData.value)
}
</script>

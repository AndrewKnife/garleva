<template>
  <div>
    {{ label }}
    <div class="py-4">
      <div v-for="field in fields" :key="field.id" class="added-field">
        <span class="m-auto">{{ field.name }}</span>
        <span class="m-auto">{{ field.id }}</span>
        <div class="w-full flex justify-center">
          <button
            @click.prevent="() => removeField(field.id)"
            class="rounded-2xl py-2 px-6 bg-totem-300 text-white uppercase"
          >
            {{ t('delete') }}
          </button>
        </div>
      </div>
    </div>
    <BaseInput class="w-full" v-model="fieldName" :placeholder="t('field_placeholder')" />
    <BaseButton class="w-full mt-6" type="button" @click.prevent="addField">
      {{ t('field_add_button') }}
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import BaseInput from '@/shared/components/inputs/BaseInput.vue';
import BaseButton from '@/shared/components/buttons/BaseButton.vue';
import { PollOption } from '@/shared/interfaces/api/apiPoll';
import { useModelWrapper } from '@/shared/composables/useModelWrapper';
import { useTranslations } from '@/shared/composables/useTranslations';

export default defineComponent({
  name: 'FieldController',
  components: { BaseButton, BaseInput },
  props: {
    modelValue: {
      type: Array as PropType<PollOption[]>,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const { t } = useTranslations();
    const fields = useModelWrapper<PollOption[]>(props, emit);
    const fieldName = ref('');

    const addField = () => {
      const newOption: PollOption = {
        id: Math.max(...[0, ...fields.value.map((field) => field.id)]) + 1,
        name: fieldName.value,
      };
      fields.value.push(newOption);
      fieldName.value = '';
    };

    const removeField = (fieldId: number) => {
      fields.value = fields.value.filter((field) => field.id !== fieldId);
    };

    return {
      t,
      fields,
      fieldName,
      addField,
      removeField,
    };
  },
});
</script>

<style scoped>
.added-field {
  @apply border-t-2 border-b-2 border-peach-800 grid grid-cols-3 py-2 text-16 lg:text-18 ml-3 my-0.5;
}
</style>

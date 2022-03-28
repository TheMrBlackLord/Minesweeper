<template>
  <div class="editable">
     <div v-if="isEditing" class="center">
         <input type="text" class="form-control" v-model="newValue">
         <button class="btn btn-outline-warning save" :disabled="newValue.length === 0" @click="save">Save</button>
         <button class="btn btn-outline-danger cancel" @click="isEditing = false">&times;</button>
      </div>
      <div v-else>
         <span class="value">{{ value }}</span>
         <button class="btn btn-outline-info edit" @click="isEditing = true">Edit</button>
      </div>
      
   </div>
</template>

<script>
export default {
   props: {
      defaultValue: { type: String, required: true },
      name: { type: String, required: true }
   },
   data() {
      return {
         isEditing: false,
         value: this.defaultValue,
         newValue: this.defaultValue
      }
   },
   methods: {
      save() {
         this.isEditing = false
         this.$emit('edited', {
            [this.name]: this.newValue
         })
         this.value = this.newValue
      }
   }
}
</script>

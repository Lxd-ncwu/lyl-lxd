<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="card p-fluid">
        <h5>添加供应商</h5>
        <div class="field">
          <label for="name">供应商名称</label>
          <InputText id="name" type="text" v-model="producer.epName" />
          <small class="p-invalid" v-if="submitted && !producer.epName">请输入姓名</small>
        </div>
        <div class="field">
          <label for="location">地址</label>
          <InputText id="location" type="text" v-model="producer.epLocation" />
          <small class="p-invalid" v-if="submitted && !producer.epLocation">请输入地址</small>
        </div>
        <div class="field">
          <label for="type">供应商类型</label>
          <InputText id="type" type="text" v-model="producer.epType" />
          <small class="p-invalid" v-if="submitted && !producer.epType">请输入供应商类型</small>
        </div>
        <div class="field">
          <label for="type">联系人</label>
          <InputText id="type" type="text" v-model="producer.epPhonePerson" />
          <small class="p-invalid" v-if="submitted && !producer.epPhonePerson">
            请输入联系人
          </small>
        </div>
        <div class="field">
          <label for="phone">联系方式</label>
          <InputText id="phone" type="text" v-model="producer.epPhone" />
          <small class="p-invalid" v-if="submitted && !producer.epPhone">请输入联系方式</small>
        </div>
        <Button label="添加" class="mr-2 mb-2" @click="addProducer"></Button>
      </div>
    </div>
  </div>
</template>

<script>
import ylRequest from "@/service"
export default {
  name: "newproducer",
  data() {
    return {
      producer: {},
      submitted: false
    }
  },
  methods: {
    async addProducer() {
      if (
        this.producer.epName == null ||
        this.producer.epLocation == null ||
        this.producer.epType == null ||
        this.producer.epPhone == null ||
        this.producer.epPhonePerson == null
      ) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "请填写完整的字段",
          life: 3000
        })
        return
      }
      this.submitted = true
      const data = await ylRequest.request({
        url: "/producer/addProducer",
        method: "POST",
        data: this.producer,
        withCredentials: true
      })
      const code = data.code
      if (code === 0) {
        this.producer = {}
        this.submitted = false
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "添加供应商成功",
          life: 3000
        })
      } else {
        this.producer = {}
        this.submitted = false
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: data.msg,
          life: 3000
        })
      }
    }
  }
}
</script>

<template>
  <card>
    <h5 slot="header" class="title">Add Coach</h5>
    <form>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Biển số</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.licensePlate"
            placeholder="Nhập biển số"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Màu xe</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.color"
            placeholder="Nhập màu xe"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Hãng sản xuất</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.manufacturer"
            placeholder="Nhập hãng sản xuất"
            required
          />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Đời xe</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.carType"
            placeholder="Nhập đời xe"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Model</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.model"
            placeholder="Nhập model"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Số ghế</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.chair"
            placeholder="Nhập số ghế"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Số năm sử dụng</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.yearUsed"
            placeholder="Nhập số năm sử dụng"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Ngày bảo dưỡng cuối</label>
        <div class="col-sm-10">
          <input
            type="date"
            class="form-control"
            v-model="coach.lastMaintenance"
            placeholder="Nhập ngày bảo dưỡng cuối"
            required
          />
        </div>
      </div>
      <button class="btn btn-primary" @click="addCoach">Submit</button>
      <div v-if="errors.length">
        <div class="validation-error mb-3" style="color: red">
          <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
        </div>
      </div>
    </form>
  </card>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      coach: {
        licensePlate: "",
        color: "",
        manufacturer: "",
        carType: "",
        model: "",
        chair: "",
        yearUsed: "",
        lastMaintenance: "",
        status: 1,
      },
      errors: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters({}),
    ...mapState({}),
  },
  mounted() {},
  methods: {
    checkForm(e) {
      this.errors = [];
      if (!this.coach.licensePlate) {
        this.errors.push("Biển số xe là bắt buộc.");
      }
      if (!this.coach.color) {
        this.errors.push("Màu sắc là bắt buộc.");
      }
      if (!this.coach.manufacturer) {
        this.errors.push("Hãng sản xuất là bắt buộc.");
      }
      if (!this.coach.carType) {
        this.errors.push("Loại xe là bắt buộc.");
      }
      if (!this.coach.model) {
        this.errors.push("Model là bắt buộc.");
      }
      if (!this.coach.chair) {
        this.errors.push("Số ghế là bắt buộc.");
      }
      if (!this.coach.yearUsed) {
        this.errors.push("Số năm sử dụng là bắt buộc.");
      }
      if (!this.coach.lastMaintenance) {
        this.errors.push("Ngày bảo dưỡng cuối cùng là bắt buộc.");
      }
      if (this.errors && this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
      e.preventDefault();
    },
    async addCoach() {
      if (this.checkForm()) {
        let data = {
          licensePlate: this.coach.licensePlate,
          color: this.coach.color,
          manufacturer: this.coach.manufacturer,
          carType: this.coach.carType,
          model: this.coach.model,
          chair: this.coach.chair,
          yearUsed: this.coach.yearUsed,
          lastMaintenance: this.coach.lastMaintenance,
          status: this.coach.status,
        };
        await this.$axios.$post("coach/add", data).then((response) => {
          if (response.code === 200) {
            this.$bvToast.toast(`Thêm thông tin xe thành công!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "success",
            });
          } else if (response.code === 409) {
            this.$bvToast.toast(`Đã tồn tại thông tin xe!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "danger",
            });
          } else {
            this.$bvToast.toast(`Thêm thông tin xe thất bại!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "danger",
            });
          }
        });
      }
    },
  },
};
</script>
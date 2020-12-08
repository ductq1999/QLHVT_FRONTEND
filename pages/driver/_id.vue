<template>
  <card>
    <h5 slot="header" class="title">Edit Driver</h5>
    <form>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Họ và tên</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="driver.name"
            placeholder="Nhập họ tên"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Chứng minh thư</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="driver.idNumber"
            placeholder="Nhập số chứng minh nhân dân"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="example-date-input" class="col-sm-2 col-form-label"
          >Ngày sinh</label
        >
        <div class="col-sm-10">
          <input
            class="form-control"
            type="date"
            v-model="driver.dateOfBirth"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Địa chỉ</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="driver.address"
            placeholder="Nhập địa chỉ"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Số bằng lái</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="driver.licenseNumber"
            placeholder="Nhập số bằng lái"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Loại bằng lái</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="driver.licenseType"
            placeholder="Nhập loại bằng lái"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Năm kinh nghiệm</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="driver.seniority"
            placeholder="Nhập số năm kinh nghiệm"
            required
          />
        </div>
      </div>
      <button class="btn btn-primary" @click="updateDriver">Submit</button>
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
      driver: {
        name: null,
        licenseNumber: null,
        licenseType: null,
        address: null,
        dateOfBirth: null,
        seniority: null,
        idNumber: null,
        status: null,
      },
      errors: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      driverById: "driver/getDriverById",
    }),
    ...mapState({}),
  },
  mounted() {
    this.getDriverById();
  },
  methods: {
    checkForm(e) {
      this.errors = [];
      if (!this.driver.name) {
        this.errors.push("Họ tên là bắt buộc.");
      }
      if (!this.driver.licenseNumber) {
        this.errors.push("Số điện thoại là bắt buộc.");
      }
      if (!this.driver.licenseType) {
        this.errors.push("Loại bằng lái là bắt buộc.");
      }
      if (!this.driver.address) {
        this.errors.push("Địa chỉ là bắt buộc.");
      }
      if (!this.driver.seniority) {
        this.errors.push("Năm kinh nghiệm là bắt buộc.");
      }
      if (!this.driver.idNumber) {
        this.errors.push("Số CMND là bắt buộc.");
      }
      if (this.errors && this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
      e.preventDefault();
    },
    async getDriverById() {
      await this.$axios
        .$get("driver/" + this.$route.params.id)
        .then((response) => {
          if (response.code === 200) {
            this.$store.dispatch("driver/setDriverByIdAction", response.data);
            this.driver.name = this.driverById.name;
            this.driver.licenseNumber = this.driverById.licenseNumber;
            this.driver.licenseType = this.driverById.licenseType;
            this.driver.dateOfBirth = this.formatDate(
              this.driverById.dateOfBirth
            );
            this.driver.seniority = this.driverById.seniority;
            this.driver.status = this.driverById.status;
            this.driver.idNumber = this.driverById.idNumber;
            this.driver.address = this.driverById.address;
          }
        });
    },
    formatDate(date) {
      let dateTime = "";
      dateTime = date.slice(0, 10);
      return dateTime;
    },
    async updateDriver() {
      if (this.checkForm()) {
        let data = {
          id: this.driverById.id,
          name: this.driver.name,
          licenseNumber: this.driver.licenseNumber,
          licenseType: this.driver.licenseType,
          address: this.driver.address,
          dateOfBirth: this.driver.dateOfBirth,
          seniority: this.driver.seniority,
          idNumber: this.driver.idNumber,
          status: this.driver.status,
        };
        await this.$axios.$put("driver/update", data).then((response) => {
          if (response.code === 200) {
            this.$bvToast.toast(`Cập nhật thông tin tài xế thành công!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "success",
            });
          } else {
            this.$bvToast.toast(`Cập nhật thông tin tài xế thất bại!`, {
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
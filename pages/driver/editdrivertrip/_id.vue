<template>
  <card>
    <h5 slot="header" class="title">Thêm tài xế vào chuyến xe</h5>
    <form>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Lương cơ bản</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="driverTrip.salaryTrip"
            placeholder="Nhập lương cơ bản"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Chọn loại tài xế</label>
        <select class="col-sm-10 form-control" v-model="driverTrip.driverType">
          <option style="color: black" value="1">Phụ xe</option>
          <option style="color: black" value="2">Lái xe</option>
        </select>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Chọn tài xế</label>
        <select class="col-sm-10 form-control" v-model="driverTrip.driver.id">
          <option
            v-for="(driver, index) in allDriver"
            :key="index"
            style="color: black"
            :value="driver.id"
          >
            tên: {{ driver.name }} ngày sinh
            {{ formatDate(driver.dateOfBirth) }} và CMTNN:
            {{ driver.licenseNumber }}
          </option>
        </select>
      </div>
      <button class="btn btn-primary" @click="addDriverTrip()">Submit</button>
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
      driverTrip: {
        driverType: null,
        salaryTrip: null,
        trip: {
          id: null,
        },
        driver: {
          id: null,
        },
      },
      errors: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      allDriver: "driver/getAllDriver",
    }),
    ...mapState({}),
  },
  mounted() {
    this.getDriver();
    this.getDriverTripById();
  },
  methods: {
    checkForm(e) {
      this.errors = [];
      if (!this.driverTrip.driverType) {
        this.errors.push("Loại tài xế đi là bắt buộc.");
      }
      if (!this.driverTrip.salaryTrip) {
        this.errors.push("Lương cơ bản là bắt buộc.");
      }
      if (!this.driverTrip.driver.id) {
        this.errors.push("Tài xế đi là bắt buộc.");
      }
      if (this.errors && this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
      e.preventDefault();
    },

    async getDriverTripById() {
      // await this.$axios
      //   .$get("driverTrip/" + this.$route.params.id)
      //   .then((response) => {
      //     if (response.code === 200) {
      //       this.$store.dispatch("driverTrip/setDriverTripByIdAction", response.data);
      //       // this.trip.code = this.tripById.code;
      //       // this.trip.date = this.formatDate(this.tripById.date);
      //       // this.trip.fare = this.tripById.fare;
      //       // this.trip.guestNumber = this.tripById.guestNumber;
      //       // this.trip.coach.id = this.tripById.coach.id;
      //       // this.trip.buses.id = this.tripById.buses.id;
      //     }
      //   });
    },
    async addDriverTrip() {
      if (this.checkForm()) {
        let data = {
          driverType: this.driverTrip.driverType,
          salaryTrip: this.driverTrip.salaryTrip,
          driver: {
            id: this.driverTrip.driver.id,
          },
          trip: {
            id: this.$route.params.id,
          },
        };
        await this.$axios.$post("driverTrip/add", data).then((response) => {
          if (response.code === 200) {
            this.$bvToast.toast(`Thêm tài xế vào chuyến đi thành công!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "success",
            });
          } else if (response.code === 409) {
            this.$bvToast.toast(`Đã tồn tại tài xế trong chuyến xe!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "danger",
            });
          } else {
            this.$bvToast.toast(`Thêm tài xế vào chuyến đi thất bại!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "danger",
            });
          }
        });
      }
    },
    getDriver() {
      this.$store.dispatch("driver/getDrivers");
    },
    formatDate(date) {
      let dateTime = "";
      dateTime =
        date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
      return dateTime;
    },
  },
};
</script>

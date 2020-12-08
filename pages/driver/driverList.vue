<template>
  <div class="row">
    <no-ssr>
      <div class="col-md-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">Tài xế</h4>
          <nuxt-link to="add"
            ><i class="tim-icons icon-simple-add"></i> Thêm tài xế</nuxt-link
          >
          <form method="get">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Họ tên</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập họ tên"
                  v-model="driver.name"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Số CMTND</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập số CMTND"
                  v-model="driver.idNumber"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Loại bằng lái</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập loại bằng lái"
                  v-model="driver.licenseType"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập địa chỉ"
                  v-model="driver.address"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Sắp xếp theo</label>
                <select class="form-control" v-model="columnSortName">
                  <option style="color: black" value="" selected>
                    Mặc định
                  </option>
                  <option style="color: black" value="name">Tên</option>
                  <option style="color: black" value="idNumber">
                    Số chứng minh thư
                  </option>
                  <option style="color: black" value="address">Địa chỉ</option>
                  <option style="color: black" value="licenseType">
                    Loại GPLX
                  </option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label>Thứ tự</label>
                <select class="form-control" v-model="asc">
                  <option style="color: black" value="true" selected>
                    Từ A -> Z
                  </option>
                  <option style="color: black" value="false">Từ Z -> A</option>
                </select>
              </div>
            </div>
            <a class="btn btn-primary" @click="getDriverByCondition">
              Tìm kiếm
            </a>
          </form>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Tên</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">Số CMTNN</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Số GPLX</th>
                <th scope="col">Loại GPLX</th>
                <th scope="col">Năm kinh nghiệm</th>
                <th scope="col" style="text-align: center">Hành động</th>
              </tr>
            </thead>
            <tbody v-if="driverByCondition.length > 0">
              <tr v-for="(driver, index) in driverByCondition" :key="index">
                <td>
                  <nuxt-link :to="{ path: '/driver/salary/' + driver.id }">{{
                    driver.name
                  }}</nuxt-link>
                </td>
                <td>{{ formatDate(driver.dateOfBirth) }}</td>
                <td>{{ driver.idNumber }}</td>
                <td>{{ driver.address }}</td>
                <td>{{ driver.licenseNumber }}</td>
                <td>{{ driver.licenseType }}</td>
                <td>
                  <div v-if="driver.seniority > 0">
                    {{ driver.seniority }} năm
                  </div>
                  <div v-else>Chưa có kinh nghiệm</div>
                </td>
                <td style="text-align: center">
                  <nuxt-link :to="{ path: '/driver/' + driver.id }"
                    ><i class="tim-icons icon-pencil"></i
                  ></nuxt-link>
                  <a style="cursor: pointer" @click="showModal(driver.id)">
                    <i class="tim-icons icon-trash-simple"></i>
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              Không có bản ghi
            </tbody>
          </table>
        </card>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="pageSize"
        ></b-pagination>
      </div>
      <b-modal ref="my-modal" id="modal-scoped">
        <div>Bạn có chắc chắn muốn xóa tài xế này không?</div>
        <template v-slot:modal-footer="{ cancel }">
          <b-button size="sm" variant="success" @click="deleteDriver(idd)"
            >Đồng ý</b-button
          >
          <b-button size="sm" variant="danger" @click="cancel">Hủy bỏ</b-button>
        </template>
      </b-modal>
    </no-ssr>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import NoSSR from "vue-no-ssr";
export default {
  components: {
    "no-ssr": NoSSR,
  },
  data() {
    return {
      idd: null,
      pageSize: 3,
      currentPage: 1,
      driver: {
        name: "",
        licenseNumber: "",
        licenseType: "",
        address: "",
        dateOfBirth: "",
        seniority: "",
        idNumber: "",
        status: 1,
      },
      columnSortName: "",
      asc: "",
    };
  },
  watch: {
    currentPage(val) {
      // when the hash prop changes, this function will be fired.
      this.currentPage = val;
      this.getDriverByCondition();
    },
  },
  computed: {
    ...mapGetters({
      allDriver: "driver/getAllDriver",
    }),
    ...mapState({
      rows: (state) => state.driver.rowDriver,
      driverByCondition: (state) => state.driver.driverByCondition,
    }),
  },
  mounted() {
    this.getDriverByCondition();
  },
  methods: {
    showModal(id) {
      this.$refs["my-modal"].show();
      this.idd = id;
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
    async deleteDriver(id) {
      await this.$axios.$delete("driver/deleteById/" + id).then((response) => {
        if (response.code === 200) {
          this.$bvToast.toast(`Xóa tài xế thành công!`, {
            title: "Thông báo",
            autoHideDelay: 5000,
            variant: "success",
          });
          this.getDriver();
          this.$refs["my-modal"].hide();
        } else {
          this.$bvToast.toast(`Xóa tài xế thất bại!`, {
            title: "Thông báo",
            autoHideDelay: 5000,
            variant: "danger",
          });
        }
      });
    },
    async getDriverByCondition() {
      await this.$axios
        .$get(
          "driver/getDriverByCondition?" +
            "page=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize +
            "&columnSortName=" +
            this.columnSortName +
            "&asc=" +
            this.asc +
            "&name=" +
            this.driver.name +
            "&idNumber=" +
            this.driver.idNumber +
            "&licenseType=" +
            this.driver.licenseType +
            "&address=" +
            this.driver.address +
            "&status=" +
            this.driver.status
        )
        .then((response) => {
          if (response.code === 200) {
            this.$store.dispatch("driver/setDriverByConditionAction", response);
            console.log("aa", response);
          }
        });
    },
  },
};
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>

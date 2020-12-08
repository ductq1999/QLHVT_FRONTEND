<template>
  <div class="row">
    <no-ssr>
      <div class="col-md-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">Coach</h4>
          <nuxt-link to="add"
            ><i class="tim-icons icon-simple-add"></i> Thêm xe</nuxt-link
          >
          <form method="get">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Biển số</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập biển số"
                  v-model="coach.licensePlate"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Mầu xe</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập Màu Xe"
                  v-model="coach.color"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Hãng sản xuất</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập loại bằng lái"
                  v-model="coach.manufacturer"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Đời xe</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập đời xe"
                  v-model="coach.carType"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Model</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập model"
                  v-model="coach.model"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Số ghế</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập số ghế"
                  v-model="coach.chair"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Số năm sử dụng</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập số năm sử dụng"
                  v-model="coach.yearUsed"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Ngày bảo dướng cuối</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập ngày bảo dưỡng cuối"
                  v-model="coach.lastMaintenance"
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
                  <option style="color: black" value="licensePlate">
                    Biển số
                  </option>
                  <option style="color: black" value="color">Màu xe</option>
                  <option style="color: black" value="manufacturer">
                    Hãng sản xuất
                  </option>
                  <option style="color: black" value="carType">Đời xe</option>
                  <option style="color: black" value="model">Model</option>
                  <option style="color: black" value="chair">Số ghế</option>
                  <option style="color: black" value="yearUsed">
                    Số năm sử dụng
                  </option>
                  <option style="color: black" value="lastMaintenance">
                    Ngày bảo dưỡng cuối
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
            <a class="btn btn-primary" @click="getCoachByCondition">
              Tìm kiếm
            </a>
          </form>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Biển số</th>
                <th scope="col">Màu xe</th>
                <th scope="col">Hãng sản xuất</th>
                <th scope="col">Đời xe</th>
                <th scope="col">Model</th>
                <th scope="col">Số ghế</th>
                <th scope="col">Số năm sử dụng</th>
                <th scope="col">Ngày bảo dướng cuối</th>
                <!-- <th scope="col">Ngày bảo dướng tiếp theo</th> -->
                <th scope="col" style="text-align: center">Hành động</th>
              </tr>
            </thead>
            <!-- <tbody v-if="allCoach.length > 0">
              <tr v-for="(coach, index) in allCoach" :key="index">
                <td>{{ coach.licensePlate }}</td>
                <td>{{ coach.color }}</td>
                <td>{{ coach.manufacturer }}</td>
                <td>{{ coach.carType }}</td>
                <td>{{ coach.model }}</td>
                <td>{{ coach.chair }}</td>
                <td>{{ coach.yearUsed }}</td>
                <td>{{ coach.lastMaintenance }}</td>

                <td style="text-align: center">
                  <nuxt-link :to="{ path: '/coach/' + coach.id }"
                    ><i class="tim-icons icon-pencil"></i
                  ></nuxt-link>
                  <a style="cursor: pointer" @click="showModal(coach.id)">
                    <i class="tim-icons icon-trash-simple"></i>
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              Không có bản ghi
            </tbody> -->
            <tbody v-if="coachByCondition.length > 0">
              <tr v-for="(coach, index) in coachByCondition" :key="index">
                <!-- <td>
                  <nuxt-link :to="{ path: '/driver/salary/' + driver.id }">{{
                    driver.name
                  }}</nuxt-link>
                </td> -->
                <td>{{ coach.licensePlate }}</td>
                <td>{{ coach.color }}</td>
                <td>{{ coach.manufacturer }}</td>
                <td>{{ coach.carType }}</td>
                <td>{{ coach.model }}</td>
                <td>{{ coach.chair }}</td>
                <td>{{ coach.yearUsed }}</td>
                <td>{{ formatDate(coach.lastMaintenance) }}</td>
                <!-- <td>{{ formatDate(getNextMaintenance(coach.id)) }}</td> -->

                <!-- <td>{{ driver.idNumber }}</td>
                <td>{{ driver.address }}</td>
                <td>{{ driver.licenseNumber }}</td>
                <td>{{ driver.licenseType }}</td> -->
                <!-- <td>
                  <div v-if="driver.seniority > 0">
                    {{ driver.seniority }} năm
                  </div>
                  <div v-else>Chưa có kinh nghiệm</div>
                </td> -->
                <td style="text-align: center">
                  <nuxt-link :to="{ path: '/coach/' + coach.id }"
                    ><i class="tim-icons icon-pencil"></i
                  ></nuxt-link>
                  <a style="cursor: pointer" @click="showModal(coach.id)">
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
        <div>Bạn có chắc chắn muốn xóa xe này không?</div>
        <template v-slot:modal-footer="{ cancel }">
          <b-button size="sm" variant="success" @click="deleteCoach(idd)"
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
import coach, { state } from "~/store/modules/coach";
export default {
  components: {
    "no-ssr": NoSSR,
  },
  data() {
    return {
      idd: null,
      pageSize: 3,
      currentPage: 1,
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
      columnSortName: "",
      asc: "",
    };
  },
  watch: {
    currentPage(val) {
      // when the hash prop changes, this function will be fired.
      this.currentPage = val;
      this.getCoachByCondition();
    },
  },
  computed: {
    ...mapGetters({
      // allDriver: "driver/getAllDriver",
      // allCoach: "coach/getAllCoach",
    }),
    ...mapState({
      rows: (state) => state.coach.rowCoach,
      coachByCondition: (state) => state.coach.coachByCondition,
    }),
  },
  mounted() {
    this.getCoachByCondition();
  },
  methods: {
    showModal(id) {
      this.$refs["my-modal"].show();
      this.idd = id;
    },
    getCoach() {
      this.$store.dispatch("coach/getCoachs");
    },

    formatDate(date) {
      let dateTime = "";
      dateTime =
        date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
      return dateTime;
    },
    async deleteCoach(id) {
      await this.$axios.$delete("coach/deleteById/" + id).then((response) => {
        if (response.code === 200) {
          this.getCoachByCondition();
          this.$refs["my-modal"].hide();
          this.$bvToast.toast(`Xóa tài xe thành công!`, {
            title: "Thông báo",
            autoHideDelay: 5000,
            variant: "success",
          });
        } else {
          this.$bvToast.toast(`Xóa tài xe thất bại!`, {
            title: "Thông báo",
            autoHideDelay: 5000,
            variant: "danger",
          });
        }
      });
    },

    async getAllCoach() {
      await this.$axios.$get("coach/getAll").then((response) => {
        if (response.code === 200) {
          this.$store.dispatch("coach/getCoachs", response);
          console.log("aa", response);
        }
      });
    },

    async getCoachByCondition() {
      await this.$axios
        .$get(
          "coach/getCoachByCondition?" +
            "page=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize +
            "&columnSortName=" +
            this.columnSortName +
            "&asc=" +
            this.asc +
            "&licensePlate=" +
            this.coach.licensePlate +
            "&color=" +
            this.coach.color +
            "&manufacturer=" +
            this.coach.manufacturer +
            "&carType=" +
            this.coach.carType +
            "&model=" +
            this.coach.model +
            "&chair=" +
            this.coach.chair +
            "&yearUsed=" +
            this.coach.yearUsed +
            "&lastMaintenance=" +
            this.coach.lastMaintenance +
            "&status=" +
            this.coach.status
        )
        .then((response) => {
          if (response.code === 200) {
            this.$store.dispatch("coach/setCoachByConditionAction", response);
            console.log("aa", response);
          }
        });
    },
    async getNextMaintenance(id) {
      await this.$axios
        .$get("coach/getNextMaintenance/" + id)
        .then((response) => {
          if (response.code === 200) {
            this.$store.dispatch(
              "coach/setNextMaintenanceAction",
              response.data
            );
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

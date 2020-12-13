<template>
  <div>
    <no-ssr>
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title">Chuyến xe</h4>
         <nuxt-link to="add"
            ><i class="tim-icons icon-simple-add"></i> Thêm chuyến xe</nuxt-link
          >
        <form method="get">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>Mã chuyến xe</label>
              <input
                type="text"
                class="form-control"
                placeholder="Nhập mã chuyến xe"
                v-model="trip.code"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label>Sắp xếp theo</label>
              <select class="form-control" v-model="columnSortName">
                <option style="color: black" value="" selected>Mặc định</option>
                <option style="color: black" value="code">Mã chuyến xe</option>
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
          <a class="btn btn-primary" @click="getTripByCondition"> Tìm kiếm </a>
        </form>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Tuyến</th>
              <th scope="col">Biển số xe</th>
              <th scope="col" style="text-align: left">Mã chuyến xe</th>
              <th scope="col">Ngày đi</th>
              <th scope="col" style="text-align: left">Giá vé</th>
              <th scope="col" style="text-align: left">Số khách</th>
              <th scope="col" style="text-align: center">Hành động</th>
            </tr>
          </thead>
          <tbody v-if="listTrip.length > 0">
            <tr v-for="(trip, index) in listTrip" :key="index">
              <td>{{ trip.buses.first }} - {{ trip.buses.last }}</td>
              <td>{{ trip.coach.licensePlate }}</td>
              <td style="text-align: left">{{ trip.code }}</td>
              <td>{{ formatDate(trip.date) }}</td>
              <td style="text-align: left">{{ numberWithCommas(trip.fare) }} VNĐ</td>
              <td style="text-align: left">{{ trip.guestNumber }}</td>
              <td style="text-align: center">
                <nuxt-link :to="{ path: '/trip/' + trip.id }"
                    ><i class="tim-icons icon-pencil" title="Sửa"></i
                  ></nuxt-link>
                <a style="cursor: pointer" @click="showModal(trip.id)">
                    <i class="tim-icons icon-trash-simple" title="Xóa"></i>
                  </a>
                   <nuxt-link :to="{ path: '/trip/addDriverTrip/' + trip.id }"
                    ><i class="tim-icons icon-user-run" title="thêm tài xế vào chuyến xe"></i
                  ></nuxt-link>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            Không có bản ghi
          </tbody>
        </table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="pageSize"
        ></b-pagination>
      </card>
    </no-ssr>
    <b-modal ref="my-modal" id="modal-scoped">
        <div>Bạn có chắc chắn muốn xóa tài xế này không?</div>
        <template v-slot:modal-footer="{ cancel }">
          <b-button size="sm" variant="success" @click="deleteTrip(idd)"
            >Đồng ý</b-button
          >
          <b-button size="sm" variant="danger" @click="cancel">Hủy bỏ</b-button>
        </template>
      </b-modal>
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
      currentPage: 1,
      pageSize: 3,
      columnSortName: "",
      asc: true,
      trip: {
        code: "",
        status: 1,
      },
    };
  },
  watch: {
    currentPage(val) {
      // when the hash prop changes, this function will be fired.
      this.currentPage = val;
      this.getTripByCondition();
    },
  },
  computed: {
    ...mapGetters({
      listTrip: "trip/getTripByCondition",
    }),
    ...mapState({
      // listTrip: (state) => state.trip.tripByCondition,
      rows: (state) => state.trip.rowTrip,
    }),
  },

  mounted() {
    this.getTripByCondition();
  },
  methods: {
    showModal(id) {
      this.$refs["my-modal"].show();
      this.idd = id;
    },
    async getTripByCondition() {
      await this.$axios
        .$get(
          "trip/getByCondition?" +
            "page=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize +
            "&columnSortName=" +
            this.columnSortName +
            "&asc=" +
            this.asc +
            "&code=" +
            this.trip.code +
            "&status=" +
            this.trip.status
        )
        .then((response) => {
          if (response.code === 200) {
            this.$store.dispatch("trip/setTripByConditionAction", response);
            console.log("aa", response);
          }
        });
    },
    async deleteTrip(id) {
      await this.$axios.$delete("trip/deleteById/" + id).then((response) => {
        if (response.code === 200) {
          this.getTripByCondition();
          this.$refs["my-modal"].hide();
          this.$bvToast.toast(`Xóa chuyến xe thành công!`, {
            title: "Thông báo",
            autoHideDelay: 5000,
            variant: "success",
          });
        } else {
          this.$bvToast.toast(`Xóa chuyến xe thất bại!`, {
            title: "Thông báo",
            autoHideDelay: 5000,
            variant: "danger",
          });
        }
      });
    },
    formatDate(date) {
      let dateTime = "";
      dateTime =
        date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
      return dateTime;
    },
     numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
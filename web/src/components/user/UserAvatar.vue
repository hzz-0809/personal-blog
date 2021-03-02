<template>
  <div class="UserAvatar">
    <el-card>
      <div slot="header" class="title">头像修改</div>
      <div class="a-cantainer">
        <div class="upload-box" @click="toggleShow">
          <img src="@/assets/img/icon/add-img.png" alt="选择图片" />
          <div class="describe">选择图片</div>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="avatar-now">
          <el-avatar :src="avatarTemp" :size="80"></el-avatar>
          <div class="describe">当前头像</div>
        </div>
        <my-upload
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="show"
          :langExt="expand"
          :width="180"
          :height="180"
          img-format="png"
          :noRotate="false"
          :field="field"
          url="http://192.168.0.103:3000/user/update/avatar"
          method="PUT"
          :headers="headers"
        ></my-upload>
      </div>
      <div class="explain">
        <p>请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload";
import { getUserInfo } from "@/network/user";
export default {
  name: "UserAvatar",
  data() {
    return {
      username: "",
      avatarTemp: "",
      show: false,
      expand: {
        success: "头像修改成功",
        fail: "500：头像修改失败，请稍后再试！",
        error: {
          onlyImg: "仅限图片格式jpg/png",
          outOfSize: "单文件大小不能超过2M",
          lowestPx: "图片最低像素为180 * 180：",
        },
      },
    };
  },
  components: {
    "my-upload": myUpload,
  },
  computed: {
    field() {
      return `${this.username}_avatar`;
    },
    headers() {
      return { authorization: "Bearer " + this.$store.state.token };
    },
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    //裁剪成功回调
    cropSuccess(imgDataUrl, field) {
      this.avatarTemp = imgDataUrl;
    },
    //上传成功回调
    cropUploadSuccess(jsonData, field) {
      this.$store.commit("setAvatar", this.avatarTemp);
    },
    //上传失败回调
    cropUploadFail(status, field) {
      if (status === 401) {
        this.$notify.error({
          title: "错误",
          message: "401：未授权，请登录！",
          duration: 2000,
        });
        this.$router.push("/login");
      }
    },
  },
  async mounted() {
    let target = document.getElementsByClassName("UserAvatar")[0];
    try {
      let res = await getUserInfo(target);
      this.avatarTemp = res.data.data.avatar;
      this.username = res.data.data.username;
    } catch (e) {
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss" scoped>
//plugin
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

//normal
.UserAvatar {
  max-width: 1000px;
  .title {
    font-family: myFont;
    font-size: 18px;
  }
  .a-cantainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .upload-box {
    width: 120px;
    height: 120px;
    margin-right: 30px;
    background: #dfe6e9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 40%;
      height: 40%;
    }
    .describe {
      color: #666;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .el-divider {
    height: 120px;
  }
  .avatar-now {
    margin-left: 30px;
    .describe {
      text-align: center;
      color: #999;
      margin-top: 10px;
      font-size: 1.4rem;
    }
  }
  .explain {
    margin-top: 50px;
    p {
      text-align: center;
      color: #999;
      font-size: 1.2rem;
    }
  }
}
</style>
<template>
  <div
    class="Agreement a-outer-container"
    :class="{ changeCursor: cursor }"
    :style="{ width: size[0] + 'px', height: size[1] + 'px' }"
  >
    <div class="a-inner-container">
      <el-collapse
        v-model="activeName"
        accordion
        :style="{ width: size[0] + 'px', height: size[1] + 'px' }"
        :change="changeCursor(activeName)"
      >
        <el-collapse-item name="1">
          <template slot="title">
            <strong>遵守法律&nbsp;<i class="el-icon-warning"></i></strong>
          </template>
          <div style="padding: 10px">
            您同意遵守中华人民共和国相关法律法规的所有规定，并对以任何方式使用您的密码和您的帐号使用本服务的任何行为及其结果承担全部责任。如您的行为违反国家法律和法规的任何规定，有可能构成犯罪的，将被追究刑事责任，并由您承担全部法律责任。
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <strong>使用规则&nbsp;<i class="el-icon-info"></i></strong>
          </template>
          <div>
            您同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为∶
          </div>
          <el-tree :data="data" :props="defaultProps" accordion />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "Agreement",
  data() {
    return {
      cursor: false,
      activeName: "1",
      data: [
        {
          id: 1,
          label: "1）发布或以其它方式传送含有下列内容之一的信息：",
          children: [
            { label: "· 反对宪法所确定的基本原则的；" },
            {
              label:
                "· 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；",
            },
            { label: "· 损害国家荣誉和利益的；" },
            { label: "· 煽动民族仇恨、民族歧视、破坏民族团结的；" },
            { label: "· 破坏国家宗教政策，宣扬邪教和封建迷信的；" },
            { label: "· 散布谣言，扰乱社会秩序，破坏社会稳定的；" },
            {
              label: "· 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；",
            },
            { label: "· 侮辱或者诽谤他人，侵害他人合法权利的；" },
            {
              common: "1-9",
              label:
                "· 含有虚假、诈骗、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其",
            },
            { common: "1-9", label: "\xa0\xa0它道德上令人反感的内容" }, //\xa0表示空格
            {
              label:
                "· 含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内",
            },
            {
              common: "1-10",
              label: "\xa0\xa0容的；",
            },
          ],
        },
        { label: "2）以任何方式危害他人的合法权益；" },
        {
          label:
            "3）冒充其他任何人或机构，或以虚伪不实的方式陈述或谎称与任何人或机构有关；",
        },
        {
          common: "4",
          label:
            "4）将依据任何法律或合约或法定关系（例如由于雇佣关系和依据保密合约所得知或揭露之",
        },
        {
          common: "4",
          label:
            "\xa0\xa0\xa0\xa0\xa0内部资料、专属及机密资料）知悉但无权传送之任何内容加以发布、发送电子邮件或以其它方式传送；",
        },
        {
          common: "5",
          label:
            "5）将侵害他人著作权、专利权、商标权、商业秘密、或其它专属权利（以下简称“专属权",
        },
        {
          common: "5",
          label: "\xa0\xa0\xa0\xa0\xa0利”）之内容加以发布或以其它方式传送；",
        },
        {
          common: "6",
          label:
            "6）将任何广告信函、促销资料、“垃圾邮件”、““滥发信件”、“连锁信件”、“直销”",
        },
        {
          common: "6",
          label:
            "\xa0\xa0\xa0\xa0\xa0或其它任何形式的劝诱资料加以发布、发送或以其它方式传送；",
        },
        {
          common: "7",
          label:
            "7）将设计目的在于干扰、破坏或限制任何计算机软件、硬件或通讯设备功能之计算机病毒",
        },
        {
          common: "7",
          label:
            "\xa0\xa0\xa0\xa0（包括但不限于木马程序（trojan horses）、蠕虫（worms）、定时炸弹、删除蝇",
        },
        {
          common: "7",
          label:
            "\xa0\xa0\xa0\xa0（cancelbots）（以下简称“病毒”）或其它计算机代码、档案和程序之任何资料，加以",
        },
        {
          common: "7",
          label: "\xa0\xa0\xa0\xa0\xa0发布、发送或以其它方式传送；",
        },
        {
          common: "8",
          label:
            "8）干扰或破坏本服务或与本服务相连线之服务器和网络，或违反任何关于本服务连线网络之",
        },
        {
          common: "8",
          label: "\xa0\xa0\xa0\xa0\xa0规定、程序、政策或规范；",
        },
        { label: "9）跟踪、人肉搜索或以其它方式骚扰他人；" },
        {
          label:
            "10）故意或非故意地违反任何适用的当地、国家法律，以及任何具有法律效力的规则；",
        },
        {
          common: "11",
          label:
            "11）未经合法授权而截获、篡改、收集、储存或删除他人个人信息、站内邮件或其它数据资",
        },
        {
          common: "11",
          label:
            "\xa0\xa0\xa0\xa0\xa0\xa0料，或将获知的此类资料用于任何非法或不正当目的。",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  props: {
    size: {
      type: Array,
      default: function () {
        return [500, 500];
      },
    },
  },
  methods: {
    changeCursor(activeName) {
      if (activeName === "2") {
        this.cursor = true;
      } else {
        this.cursor = false;
      }
    },
  },
};
</script>
<style lang="scss">
.a-outer-container {
  position: relative;
  overflow: hidden;
}
.a-inner-container {
  position: absolute;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
/* for Chrome */
.a-inner-container::-webkit-scrollbar {
  display: none;
}
.Agreement {
  margin: 0 auto 0;
  span {
    font-size: inherit;
  }
}
.Agreement.changeCursor {
  div,
  span {
    // cursor: url("http://127.0.0.1:3000/static/mouse.cur"), default;
    cursor: url("http://192.168.0.104:3000/static/mouse.cur"), default;
  }
}
</style>;

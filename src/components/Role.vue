<template>
  <div class="container">
    <div class="left">
      <h2>Player 1</h2>
      <div class="player-1"></div>
    </div>
    <div class="middle">
      <span class="title">{{computedTitle}}</span>
      <div class="roles">
        <div class="role" v-for="(role,index) in roles" :key="index">
          <img :src="role.img" :alt="role.roleName" @click="selectRole(index)">
        </div>
      </div>
      <button class="submit" @click="toogle">{{buttonContent}}</button>
    </div>
    <div class="right">
      <h2>Player 2</h2>
      <div class="player-2"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "role",
  data() {
    return {
      roles: [
        {
          img: "/static/img/hm.jpeg",
          roleName: "海绵宝宝"
        },
        {
          img: "/static/img/paidaxing.jpeg",
          roleName: "派大星"
        },
        {
          img: "/static/img/pi.jpeg",
          roleName: "痞老板"
        },
        {
          img: "/static/img/xie.jpeg",
          roleName: "蟹老板"
        },
        {
          img: "/static/img/zhang.jpeg",
          roleName: "章鱼哥"
        }
      ],
      select: true,
      title: ["选择角色", "角色选择中...", "角色选定"],
      selectIndex: 0,
      init: true,
      player1Ready:true
    };
  },
  computed: {
    buttonContent() {
      if (this.select) {
        return "确定";
      } else {
        return "取消";
      }
    },
    computedTitle() {
      if (this.init) {
        return this.title[0];
      }
      if (this.select) {
        return this.title[1];
      } else {
        return this.title[2];
      }
      return this.title[0];
    }
  },
  watch:{
      select(){
          if(!this.select){
              let image=new Image();
              image.src=this.roles[this.selectIndex].img;
              image.style="width:300px;height:300px;object-fit:cover;border-radius:8px;margin-top:10px;border:3px solid #eee;";
              document.querySelector('.player-1').appendChild(image);
          }else{
              document.querySelector('.player-1 img').remove();
          }
      }
  },
  methods: {
    selectRole(index) {
      this.init = false;
      this.selectIndex = index;
      if (this.select) {
        let imgs = document.querySelectorAll(".role img");
        imgs[index].className = "selected";
        for (let i = 0; i < imgs.length; i++) {
          if (i != index) {
            imgs[i].className = "role";
          }
        }
      }
    },
    toogle(event) {
      this.select = !this.select;
    }
  }
};
</script>
<style scoped>
.container {
  display: grid;
  grid-template-areas: "a b c";
}
.left {
  grid-area: a;
}
.middle {
  grid-area: b;
}
.right {
  grid-area: c;
}
.title {
  display: inline-block;
  margin-bottom: 30px;
  font-size: 1.5em;
}
.roles {
  display: flex;
  justify-content: center;
}

.role img {
  width: 150px;
  border: 3px solid #03a9f4;
  -o-object-fit: cover;
  object-fit: cover;
  height: 150px;
  margin: 0 15px 0 15px;
  border-radius: 10px;
}
.role img:hover {
  transform: scale(1.1, 1.1);
}

.selected {
  width: 150px;
  -o-object-fit: cover;
  object-fit: cover;
  height: 150px;
  border-radius: 10px;
  margin: 0 15px 0 15px;
  transform: scale(1.05, 1.05);
  border: 4px solid #f49f36 !important;
}

.submit {
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background: gainsboro;
  border: none;
  margin-top: 30px;
  font-size: 1.2em;
}

.submit:hover {
  transform: scale(1.05, 1.05);
}

</style>


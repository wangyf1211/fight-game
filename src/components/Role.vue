<template>
  <div class="_container">
    <div class="left">
      <h3>Player 1</h3>
      <div>
        <span>生命值</span>
        <div class="progress" style="width:220px;">
          <div
            class="progress-bar"
            role="progressbar"
            :style="{width:player1Life+'%',background:'#5cb85c'}"
            v-life="player1Life"
          >{{player1Life}}</div>
        </div>
      </div>
      <div class="player-1">
        <button v-show="!init" class="submit" @click="toogle">{{buttonContent}}</button>
      </div>
    </div>
    <div class="middle">
      <h2 style="margin-top:-10px;font-family: fantasy;font-weight: bold;">Round {{round}}</h2>
      <span class="title">{{computedTitle}}</span>
      <div class="roles">
        <div class="role" v-for="(role,index) in roles" :key="index">
          <img :src="role.img" :alt="role.roleName" @click="selectRole(index)">
        </div>
      </div>
    </div>
    <div class="right">
      <h3>Player 2</h3>
      <div>
        <span>生命值</span>
        <div class="progress" style="width:220px;">
          <div
            class="progress-bar"
            role="progressbar"
            :style="{width:player2Life+'%',background:'#5cb85c'}"
            v-life="player2Life"
          >{{player2Life}}</div>
        </div>
      </div>
      <div class="player-2">
        <button v-show="player2Ready" class="submit" @click="toogle">{{buttonContent}}</button>
      </div>
    </div>
    <div class="bottom" v-if="player2Ready">
      <Skill name="skill-bar" v-on:attack="player1Attack"/>
      <div class="fight-content" v-html="gameTip"></div>
      <Skill name="skill-bar"/>
    </div>
    <!-- 模态框 -->
    <div class="modal" tabindex="-1" role="dialog" id="attackResult">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Round {{round}}</h3>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>{{result}}</h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">知道了</button>
            <button type="button" class="btn btn-default" @click="nextRound">下一局</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </div>
</template>
<script>
import Skill from "@/components/Skill";
export default {
  name: "role",
  components: {
    Skill
  },
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
      title: [
        "选择角色",
        "角色选择中...",
        "角色选定，等待电脑玩家选定角色",
        "开始游戏中..."
      ],
      selectIndex1: 10,
      selectIndex2: 10,
      init: true,
      player1Ready: false,
      player2Ready: false,
      player1Life: 100,
      player2Life: 100,
      gameTip: "对战进行中...",
      round: 1,
      winFlag: true
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
      }
      if (!this.select) {
        return this.title[2];
      }
      if (this.player1Ready) {
        return this.title[3];
      }
      return this.title[0];
    },
    result() {
      if (this.winFlag) {
        return "You win.";
      } else {
        return "You lose. Try again? ";
      }
    }
  },
  watch: {
    player1Life() {
      if (this.player1Life <= 0 && this.player2Life > 0) {
        this.winFlag = false;
      }
    },
    selectIndex1() {
      let div = document.querySelector(".player-1");
      let button = document.querySelector(".player-1 button");
      let imgs = document.querySelector(".player-1 img");
      if (imgs) {
        imgs.remove();
      }
      let image = new Image();
      image.src = this.roles[this.selectIndex1].img;
      image.style =
        "display:block;width:250px;height:250px;object-fit:cover;border-radius:8px;margin:10px;border:3px solid #eee;position:relative;left:5px;";
      div.insertBefore(image, button);
    },
    selectIndex2() {
      let div = document.querySelector(".player-2");
      let button = document.querySelector(".player-2 button");
      let imgs = document.querySelector(".player-2 img");
      if (imgs) {
        imgs.remove();
      }
      let image = document.createElement("img");
      //   let image = new Image();
      image.src = this.roles[this.selectIndex2].img;
      image.style =
        "display:block;width:250px;height:250px;object-fit:cover;border-radius:8px;margin:10px;border:3px solid #eee;";
      div.insertBefore(image, button);
    },
    select() {
      let imgs = document.querySelectorAll(".role img");
      if (!this.select) {
        imgs.forEach((item, index) => {
          if (index != this.selectIndex1) {
            imgs[index].style = "cursor:not-allowed;transform:none;";
          }
        });
        this.player1Ready = true;
      } else {
        imgs.forEach((item, index) => {
          imgs[index].style = "cursor:unset;";
        });
        this.player1Ready = false;
        this.gameTip = "对战进行中...";
      }
    },
    player1Ready() {
      let imgs = document.querySelectorAll(".role img");
      if (this.player1Ready) {
        this.changeStyle(imgs);
        setTimeout(() => {
          this.player2Ready = true;
        }, 0);
      }
    }
  },
  directives: {
    life(el, binding) {
      if (binding.value >= 90 && binding.value <= 100) {
        el.style.background = "#5cb85c";
      } else if (binding.value >= 50 && binding.value < 90) {
        el.style.background = "#f0ad4e";
      } else if (binding.value > 0 && binding.value < 50) {
        el.style.background = "#d9534f";
      } else {
        $("#attackResult").modal("show");
      }
    }
  },
  methods: {
    nextRound() {
      $("#attackResult").modal("hide");
      this.round++;
      this.init = true;
      this.select = true;
      this.selectIndex1 = 10;
      this.selectIndex2 = 10;
      this.player1Life = 100;
      this.player2Life = 100;
      this.gameTip = "对战进行中...";
      this.winFlag = true;
    },
    selectRole(indexArr) {
      this.init = false;
      let imgs = document.querySelectorAll(".role img");
      if (this.select) {
        this.selectIndex1 = indexArr;
        imgs[indexArr].className = "selected";
        for (let i = 0; i < imgs.length; i++) {
          if (i != indexArr) {
            imgs[i].className = "role";
          }
        }
      }
    },
    toogle(event) {
      this.select = !this.select;
    },
    changeStyle(arr) {
      let index = Math.floor(Math.random() * 5);
      arr[index].style =
        "border: 4px solid #f40303 !important;transform: scale(1.05, 1.05);";
      this.selectIndex2 = index;
    },
    player1Attack(skill, randSkills) {
      if (this.player2Life > 0) {
        if (this.player2Life - skill.harm >= 0) {
          this.player2Life -= skill.harm;
        } else {
          this.player2Life = 0;
        }
        this.gameTip +=
          "<br>玩家2被" + skill.name + "伤害了" + skill.harm + "点";
      } else {
        this.winFlag = true;
      }
      let randSkill = randSkills[Math.floor(Math.random() * randSkills.length)];
      if (this.player1Life > 0) {
        this.player1Life =
          this.player1Life - randSkill.harm >= 0
            ? this.player1Life - randSkill.harm
            : 0;
        this.gameTip +=
          "<br>玩家1被" + randSkill.name + "伤害了" + randSkill.harm + "点";
      } else {
        this.winFlag = false;
      }
    }
  }
};
</script>
<style scoped>
._container {
  color: #fff;
  display: grid;
  grid-template-areas: "a b c" "d d d";
  grid-template-rows: 450px 1fr;
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
.bottom {
  grid-area: d;
  margin: 0 auto;
  font-size: 1.5em;
  color: #ddd;
  display: flex;
  justify-content: space-between;
  width: 80%;
}
.title {
  display: inline-block;
  margin-bottom: 30px;
  font-size: 1.5em;
  padding: 10px 24% 10px;
  background: rgba(62, 62, 62, 0.7);
  border-radius: 5px;
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
  margin: 20px 0 0 0;
  font-size: 1.2em;
}

.submit:hover {
  transform: scale(1.05, 1.05);
}

.player-1 img,
.player-1 button {
  margin: 20px 0 0 0;
}

.left div:first-of-type,
.right div:first-of-type {
  display: flex;
  align-items: center;
}
.left div:first-of-type span,
.right div:first-of-type span {
  display: block;
  margin: 0 10px 0 10px;
  color: #eee;
}

.fight-content {
  background: rgba(27, 27, 27, 0.5);
  width: 80%;
  border-radius: 8px;
  padding: 10px;
}

#attackResult .modal-dialog {
  height: 200px;
  position: relative;
  top: 50%;
  margin-top: -100px;
}
#attackResult .modal-content {
  background: #62c7f5;
}
.modal-footer .btn {
  margin: 0 auto;
  color: #fff;
  font-size: 1.05em;
  border-color: #fff;
}
.modal-footer .btn:hover {
  background-color: rgba(221, 221, 221, 0.4);
}
</style>


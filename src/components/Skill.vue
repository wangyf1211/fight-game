<template>
  <div>
    <div class="row" v-for="(skill,index) in randSkills" :key="index">
      <img
        :src="skill.img"
        :alt="skill.name"
        :title="'技能名称：'+skill.name+'\n技能伤害：'+skill.harm"
        @click="triggerAttack(skill,randSkills)"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "skill-bar",
  props:['skillNum'],
  data() {
    return {
      skills: [
        {
          img: "/static/img/1.png",
          name: "小水波biubiubiu技能",
          harm: 10
        },
        {
          img: "/static/img/2.png",
          name: "抓水母技能",
          harm: 10
        },
        {
          img: "/static/img/3.png",
          name: "投掷蟹黄堡技能",
          harm: 20
        },
        {
          img: "/static/img/4.png",
          name: "小蜗技能",
          harm: 20
        },
        {
          img: "/static/img/5.png",
          name: "吹泡泡技能",
          harm: 25
        },
        {
          img: "/static/img/6.png",
          name: "溜溜笛技能",
          harm: 25
        },
        {
          img: "/static/img/7.png",
          name: "恶作剧技能",
          harm: 30
        },
        {
          img: "/static/img/8.png",
          name: "奇妙海胆技能",
          harm: 30
        },
        {
          img: "/static/img/9.png",
          name: "风雨来袭技能",
          harm: 35
        },
        {
          img: "/static/img/10.png",
          name: "冷笑话技能",
          harm: 35
        }
      ],
      randSkills: []
    };
  },
  mounted() {
    this.composeSkill(this.skillNum);
  },
  beforeUpdate(){
    console.log('beforeUpdate: ',this.skillNum)
    this.composeSkill(this.skillNum);
  },
  updated(){
    console.log('updated: ',this.skillNum)
    this.composeSkill(this.skillNum);
  },
  methods: {
    composeSkill(len) {
      let res = [];
      let rand = Math.floor(Math.random() * 10);
      res.push(rand);
      while (this.randSkills.length < len) {
        rand = Math.floor(Math.random() * 10);
        if (res.indexOf(rand) == -1) {
          res.push(rand);
          this.randSkills.push(this.skills[rand]);
        }
      }
    },
    triggerAttack(skill, randSkills) {
      this.$emit("attack", skill, randSkills);
    }
  }
};
</script>
<style scoped>
img {
  width: 75px;
  height: 75px;
  object-fit: cover;
  -o-object-fit: cover;
  background: rgba(255, 255, 255, 0.5);
  margin-top: 10px;
  border-radius: 5px;
}
img:hover {
  background: rgba(244, 244, 244, 0.8);
  transform: scale(1.05, 1.05);
}
</style>

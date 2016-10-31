<template lang="pug">

section
  h1
    img(alt='採取したサンプル' src='img/list/title-samples.png' srcset='img/list/title-samples@2x.png 2x')
  table#samples
    thead
      tr
        th.index No.
        th.genus_ja 属名
        th.genus_en 属名（英）
        th.dna DNA配列
        th.region 同定に用いたDNA領域
        th.date 採取日
    tbody
      tr(v-for="(item, index) in samples")
        td.index {{ (index+1) | zero-pad }}
        td.genus_ja {{ item.genus_ja }}
        td.genus_en {{ item.genus_en }}
        td.dna {{ item.dna }}
        td.region {{ item.region }}
        td.date {{ item.date }}
  h1
    img(alt='森の知識' src='img/list/title-knowledges.png' srcset='img/list/title-knowledges@2x.png 2x')
  table#knowledge
    tbody
      tr(v-for="(item, index) in knowledges")
        td.index {{ (index+1) | zero-pad }}
        td.title {{ item.title }}
        td.description {{ item.description }}

</template>

<style lang="sass?indentedSyntax" scoped>

h1
  padding: 30px 27px
  background-color: #2b2b2b
  margin-bottom: 1px

table
  width: 100%
  max-width: 100%
  font-size: 14px

  tr
    height: 55px
    th,td
      vertical-align: middle
      padding-left: 27px
      &:last-child
        padding-right: 27px

  thead
    background-color: #2b2b2b
    th
      text-align: left
      color: #656566
      font-size: 12px
  tbody
    tr:hover
      background-color: #202020
    td
      &.dna
        max-width: 150px
        overflow: hidden
        white-space: nowrap
      &.index
        font-family: 'Hiragino Maru Gothic Pro','ヒラギノ丸ゴ Pro W6','HiraMaruProN-W6', '游ゴシック体', 'Yu Gothic', YuGothic, 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', sans-serif
        font-weight: bold
        width: 30px
      &.title,
      &.genus_ja
          width: 150px
      &.description
        max-width: 150px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis

</style>

<script>
import Vue from 'vue';

export default Vue.extend({
  filters: {
    'zero-pad': function (value) {
      return (value<10) ? '0'+value : ''+value;
    }
  },
  data () {
    return {
      samples: [
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: '前記カンジダ',
          genus_en: 'Candida',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.09',
        },
        {
          genus_ja: 'スターメレラ',
          genus_en: 'Starmerella',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ピチア',
          genus_en: 'Pichia',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ウィケルハミエラ',
          genus_en: 'Wickerhamiella',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.09',
        },
        {
          genus_ja: 'スターメレラ',
          genus_en: 'Starmerella',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.09',
        },
        {
          genus_ja: '前記カンジダ',
          genus_en: 'Candida',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'ITS',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ピチア',
          genus_en: 'Pichia',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ウィケルハミエラ',
          genus_en: 'Wickerhamiella',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.09',
        },
        {
          genus_ja: 'スターメレラ',
          genus_en: 'Starmerella',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.09',
        },
        {
          genus_ja: '前記カンジダ',
          genus_en: 'Candida',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.09',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.10',
        },
        {
          genus_ja: 'ピチア',
          genus_en: 'Pichia',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'ITS',
          date: '2016.10.10',
        },
        {
          genus_ja: 'ウィケルハミエラ',
          genus_en: 'Wickerhamiella',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.10',
        },
        {
          genus_ja: 'スターメレラ',
          genus_en: 'Starmerella',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.10',
        },
        {
          genus_ja: '前記カンジダ',
          genus_en: 'Candida',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'ITS',
          date: '2016.10.10',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.10',
        },
        {
          genus_ja: 'ピチア',
          genus_en: 'Pichia',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.10',
        },
        {
          genus_ja: 'ウィケルハミエラ',
          genus_en: 'Wickerhamiella',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'ITS',
          date: '2016.10.10',
        },
        {
          genus_ja: 'スターメレラ',
          genus_en: 'Starmerella',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'ITS',
          date: '2016.10.10',
        },
        {
          genus_ja: '前記カンジダ',
          genus_en: 'Candida',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.10',
        },
        {
          genus_ja: 'ロドトルラ',
          genus_en: 'Rhodotorula',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.10',
        },
        {
          genus_ja: 'ピチア',
          genus_en: 'Pichia',
          dna: 'GATTTCTTTGCCTTAAATTGAAAAGCTACCCGTCCGGACATTGTGAAACGCCCCTTCCGGGGCATTGCTTGGGCGCCGCAAGGTGCCCGACGTTTAAACTCTTATGTTTATCTCTGACAACCAAGAAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAAAGA',
          region: 'matK/rbcL',
          date: '2016.10.10',
        },
      ],
      knowledges: [
        {
          title: 'ユスリカ',
          description: 'ハエ目の昆虫。蚊柱の多くはユスリカのオスの群飛で、メスはその群飛に飛び込み交尾をし、水辺に移動し産卵します。成虫の口器は退化し、食物をとらず、1日から数日の命です。幼虫は水底で成長し、魚類などの餌です。仁保の森には、山間渓流に生息するコヒメユスリカ（モンユスリカ亜科）、カニエリユスリカ（エリユスリカ亜科）、水田など発生するウスイロユスリカ（ユスリカ亜科）をはじめ多種が生息。',
        },
        {
          title: 'トンボ',
          description: '食虫性の昆虫。飛びながら小さな昆虫を捕えて食べます。体は細長く、早く、まっすぐに飛び、旋回やホバリングもこなします。大きな複眼は飛翔しながら昆虫を探すセンサーです。幼虫はヤゴとよばれ水棲で肉食です。仁保の森には、イトトンボ、カワトンボ、オニヤンマ、ヤンマ、サナエ、トンボの仲間など多種類が生息。特に渓流では、春にムカシトンボやカワトンボ、5月頃からサナエの仲間、夏にはヤンマの仲間などがみられます。',
        },
        {
          title: 'カエル',
          description: '水中と陸上の両方で活動する半水生、繁殖期以外は陸上で生活する陸生に分かれます。後足は長く、跳躍運動に適応し、水かきがあります。樹上性カエルの指には吸盤があります。オタマジャクシは水中で成長します。意外と視野は狭いが、動いているものは捉えることができます。渓流域の森林部にはカジカガエル、モリアオガエル、ヤマアカガエル、タゴガエル、二ホンヒキガエルが生息。田畑周辺にはニホンアマガエルなどが生息。',
        },
        {
          title: 'フクロウ',
          description: '多くは肉食性の鳥類で、夜行性の種が多く、大型種はネズミ、小鳥、ヘビなどを捕食します。小型種は昆虫食です。風切羽に消音構造があり、羽音をたてずに飛びます。頭は大きく、鋭いくちばし、大きな目、発達した耳を持ちます。仁保の森に生息している種類は、留鳥ではフクロウ、オオコノハズク、夏鳥ではアオバズク、コノハズク、冬鳥ではコミミズク、トラフグス。',
        },
        {
          title: 'ウロの話',
          description: 'ケヤキなどの大きく成長する樹にはウロと呼ばれる穴ができやすいので、そこにフクロウなどが巣をつくります。ウロは入口の直径が10cm程度のさほど大きくはないものでも、奥が広くなっていることが多く、体長約50cmのフクロウも暮らすことができます。複数の動物が利用するため、ムササビや、夏に渡ってくるアオバズクなども使います。',
        },
        {
          title: '仁保の森と川',
          description: '山口市仁保上郷にある森は、植林による針葉樹も少なく、自然に育った多様な広葉樹が残っている良い森です。奥には落差20メートルの「犬鳴の滝」があり、川となって森と里をつなぎ、仁保川に流れ込んでいます。山や里によくいる生き物に加えて渓流系の生き物も住んでいる豊かな森であり、典型的な山口の里山の風景が広がっています。',
        },
        {
          title: 'ハムシ',
          description: 'ハムシ（葉虫）は幼虫も成虫も生きた植物にくっついて、葉っぱを食べて暮らしています。甲虫目で硬い虫であり、危険を察知するとすぐ葉っぱから落ちて身を守ります。食べる植物の好き嫌いがハッキリしていて、シソ科の多年草などを好みます。',
        },
        {
          title: '山道と広場と崖の穴',
          description: '人が通る山道は動物の通り道にもなっており、夜間にカメラを置いておくと動物たちが多く映ります。フクロウは広くひらけたところを狩場として利用します。夜、木の高いところから観察し、野ネズミなどが出てくると捉えて食べます。また、崖の穴は、ヒミズ（モグラの仲間）、モグラ、ヘビ、ノネズミなどの生息場所としてシェアされています。',
        },
        {
          title: '危険な生きもの',
          description: '秋の採集の時期はカエルがいたのでマムシも出てきていました。ヘビは草むらにいることも多く、草むらに入ることがある場合は気をつけて入る必要があります。ブト・ブヨや蚊にも注意が必要です。',
        },
        {
          title: 'ノネズミ',
          description: '森にはたくさんのノネズミが生息しています。林の中では直径1-2cmの穴を多く見つけることができますが、これらはノネズミの巣穴であることも多いです。ノネズミは夜行性の動物で、夜に活動してドングリ類などを食べています。フクロウの主な食料でもあります。',
        },
        {
          title: 'ザトウムシ',
          description: 'クモを連想するような長い足を持った外見のためザトウグモとも呼ばれますが、網状の巣をつくるクモとは別グループに属します。ザトウグモは川を超えられないので、川をはさんで、種が異なっている可能性もあります。',
        },
      ]
    }
  }
});
</script>

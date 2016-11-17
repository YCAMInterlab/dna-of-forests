<template lang="pug">

.wrapper
  .containter
    .modal
      img.logo(alt='森のDNA図鑑 仁保の森 2016 YCAM Bio Research' src='/dna-of-forests/img/top-modal/logo.png' srcset='/dna-of-forests/img/top-modal/logo@2x.png 2x')
      img.lead(alt='YCAMバイオ・リサーチのワークショップ「森のDNA」の参加者と山口市の仁保の森で生き物を採集し、顕微鏡での観察記録やDNA解析の結果を収録しています。' src='/dna-of-forests/img/top-modal/lead.png' srcset='/dna-of-forests/img/top-modal/lead@2x.png 2x')
      router-link(to='/panorama') ENTER

</template>

<style lang="sass?indentedSyntax" scoped>

.wrapper
  display: table
  position: absolute
  width: 100%
  height: 100%
  z-index: 9999

.containter
  display: table-cell
  width: 100%
  height: 100%
  vertical-align: middle

.modal
  background-color: #000
  padding: 10px
  width: 252px
  height: 558px
  padding: 25px
  border-radius: 20px
  margin-left: auto
  margin-right: auto
  text-align: center
  .logo
    margin-top: 95px
    margin-bottom: 110px
  a
    cursor: pointer
    display: block
    font-family: "Roboto"
    font-size: 15px
    border-radius: 2px
    padding: 20px
    border: 1px solid #3f3f3f
    color: #fff
    text-decoration: none
    letter-spacing: 0.15em
    margin-top: 28px
    transition-duration: 0.2s
    &:hover
      border-color: #aaa


</style>

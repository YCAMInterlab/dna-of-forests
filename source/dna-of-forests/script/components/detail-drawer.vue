<template lang="pug">

.drawer
  header
    h2
      img(alt='森の知識' src='/dna-of-forests/img/detail-drawer/title-chisiki.png' srcset='/dna-of-forests/img/detail-drawer/title-chisiki@2x.png 2x')
    router-link.close_btn(to='./')
      img(alt='Close' src='/dna-of-forests/img/detail-drawer/close-btn.png' srcset='/dna-of-forests/img/detail-drawer/close-btn@2x.png 2x')
  article

</template>

<style lang="sass?indentedSyntax" scoped>

.drawer
  position: absolute
  width: 490px
  height: 100%
  right: 0
  background-color: #1a1a1a
  z-index: 9999
  box-shadow: 0 0 20px rgba(0,0,0,0.5);

header
  background-color: #2b2b2b
  padding: 28px 25px
  position: relative
  h2
    text-align: center
  .close_btn
    display: inline-block
    padding: 28px 25px
    position: absolute
    top: 0
    right: 0
    cursor: pointer
    opacity: 0.15
    &:hover
      opacity: 0.5

</style>
@Plugin({
  options: {
    name: `David Lorem`,
    age: `15`,
  }
})
export default class Header {
  init() {
    console.log(`Init Header Plugin`);
    console.log(`This's Plugin Dom :`);
    console.log(this.$element);
    console.log(`This's ${this.options.name}, He's ${this.options.age} year old, Thank your listening !!!`);
  }
}
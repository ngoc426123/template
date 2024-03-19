@Plugin({
  options: {
    dataTable : '[data-table]'
  }
})
export default class Main {
  init () {
    this.initDOM();
    this.handleEvent();
  }

  initDOM () {
    const {
      dataTable
    } = this.options;
    
    this.$table = this.$element.find(dataTable);
    add
  }

  async handleEvent () {
    await fetch('./data/person.json')
      .then(res => res.json())
      .then(data => {
        const tableBody = () => {
          return data.data.map((item) => `<tr>
            <td><img src="${item.picture.thumbnail}" /></td>
            <td>${item.gender}</td>
            <td>${item.name.first} ${item.name.title} ${item.name.last}</td>
            <td>${item.location.street.number} ${item.location.street.name} ${item.location.country}</td>
            <td>${item.phone}</td>
            <td>${item.email}</td>
          </tr>`);
        };
        this.$table.append(`<tbody>${tableBody()}</tbody>`);
    });
    this.$table.TableResponsive();
  }
}
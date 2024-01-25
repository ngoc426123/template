@Plugin({
  options: {
    pluginName: `TableRespsonsive`,

    dataTableHead: 'th',
    dataTableRow: 'tr',
    dataTableCell: 'td',
  }
})
export default class TableResponsive {
  init () {
    this.initDOM();
    this.handleEvent();
  }

  initDOM () {
    const { $element } = this;
    const {
      dataTableHead,
      dataTableRow,
      dataTableCell
    } = this.options;

    this.tblHead = $element.find(dataTableHead);
    this.tblRow = $element.find(dataTableRow);
    this.tblCell = $element.find(dataTableCell);
  }

  handleEvent () {
    const arr_text_table_head = [];

    this.tblHead.each((index, element) => {
      arr_text_table_head.push($(element).text());
    });

    this.tblRow.each((indexRow, tblRow) => {
      $(tblRow).find(this.tblCell).each((indexCell, tblCell) => {
        $(tblCell).attr('data-title', arr_text_table_head[indexCell]);
      });
    });
  }
}
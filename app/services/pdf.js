import Ember from 'ember';
import PDFDoc from 'npm:pdfkit';

export default Ember.Service.extend({
  createInvoice: function(pipe, invoice, options) {
    options = options || {};
    options.currencySymbol = options.currencySymbol || '$';

    var black = '#000',
        darkGrey = '#696969',
        medGrey = '#ddd';

    var mainFont = 'Helvetica';

    var doc = new PDFDoc();

    doc.pipe(pipe);

    var tableDividerLine = function(doc, y) {
      doc.save()
        .rect(45, y, 515, 1)
        .fill(medGrey)
        .restore();
      return doc;
    };

    doc.font(mainFont + '-Bold', 26)

      // Title
      .fillColor(black)
      .text('INVOICE', 50, 50, {
        stroke: false
      })

      // Entity Name
      .font(mainFont, 9)
      .fillColor(darkGrey)
      .text('From', 390, 60)

      .font(mainFont + '-Bold', 10)
      .fillColor(black)
      .text(Ember.get(invoice, 'entityName'), 425, 60)

      // Line separator
      .save()
      .rect(418, 55, 1, 20)
      .fill(medGrey)
      .restore()

      // Invoice Info
      .font(mainFont, 9)
      .fillColor(darkGrey)
      .text('Invoice ID', 50, 135)
      .text('Issue Date', 50, 155)
      .text('Due Date', 50, 175)
      .text('Subject', 50, 195)

      .font(mainFont + '-Bold', 9)
      .fillColor(black)
      .text(Ember.get(invoice, 'invoiceID'), 120, 135)
      .font(mainFont, 9)
      .text(Ember.get(invoice, 'issueDate'), 120, 155)
      .text(Ember.get(invoice, 'dueDate'), 120, 175)
      .text(Ember.get(invoice, 'subject'), 120, 195)

      // Client name
      .font(mainFont, 9)
      .fillColor(darkGrey)
      .text('Invoice For', 365, 135)

      .font(mainFont + '-Bold', 10)
      .fillColor(black)
      .text(Ember.get(invoice, 'clientName'), 425, 135, {
        lineBreak: false
      })

      // Line separator
      .save()
      .rect(418, 130, 1, 20)
      .fill(medGrey)
      .restore()

      // Line Separator
      .save()
      .rect(110, 130, 1, 80)
      .fill(medGrey)
      .restore()

      // Itemized Details
      .font(mainFont + '-Bold', 8)
      .fillColor(black)
      .text('Item Type', 50, 250)
      .text('Description', 120, 250)
      .text('Quantity', 370, 250)
      .text('Unit Price', 428, 250)
      .text('Amount', 485, 250, {
        align: 'right'
      })

      .save()
      // Line Separators
      .rect(110, 245, 1, 16)
      .rect(360, 245, 1, 16)
      .rect(418, 245, 1, 16)
      .rect(475, 245, 1, 16)
      .fill(medGrey)
      .restore()
    ;

    var y = 260;

    tableDividerLine(doc, y);

    doc.font(mainFont, 8);

    Ember.get(invoice, 'items').forEach(function(item) {
      var marginTop = 10,
          marginBottom = 15,
          rowHeight = marginTop + marginBottom;

      doc.save()
        .rect(110, y, 1, rowHeight)
        .rect(360, y, 1, rowHeight)
        .rect(418, y, 1, rowHeight)
        .rect(475, y, 1, rowHeight)
        .fill(medGrey)
        .restore();

      y += marginTop;

      var quantityStr = options.currencySymbol + ' ' + Ember.get(item, 'quantity'),
          unitPriceStr = options.currencySymbol + ' ' + Ember.get(item, 'unitPrice'),
          amountStr = options.currencySymbol + ' ' + Ember.get(item, 'amount');

      doc.font(mainFont, 8)
        .text(Ember.get(item, 'itemType'), 50, y)
        .text(Ember.get(item, 'description'), 120, y)
        .text(quantityStr, 370, y)
        .text(unitPriceStr, 428, y)
        .font(mainFont + '-Bold', 8)
        .text(amountStr, 485, y, {
          align: 'right'
        });

      y += marginBottom;
      tableDividerLine(doc, y);
    });

    y += 20;

    var amountDueStr = options.currencySymbol + ' ' + Ember.get(invoice, 'amountDue');

    // Total Amount Due
    doc.font(mainFont + '-Bold', 14)
      .text('Amount Due', 340, y)
      .text(amountDueStr, 450, y, {
        align: 'right'
      })
    ;

    // Notes
    var notes = Ember.get(invoice, 'notes');
    if (notes && notes.length) {
      y += 40;

      doc.font(mainFont + '-Bold', 10)
        .text('Notes', 50, y);

      y += 15;

      tableDividerLine(doc, y);

      y += 15;

      doc.font(mainFont, 9)
        .text(notes, 50, y);
    }

    doc.end();

    return doc;
  }
});

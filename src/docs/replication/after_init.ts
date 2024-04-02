
export function init() {
  try {



    if (PluginType == 2) {
      generateLink('Сохранить заявления во ФГИС', batch_get_statement_to_save)
    }
    generateLink('Сохранить документы во ФГИС', batch_get_document_to_save)
    generateLink('Запустить авто подписание', batch_get_items_to_sign)
    // generateLink('Отправить сообщение',send_message_back)
    generateStatusSpan("Выполняет 0 из 0", -2)

    window.addEventListener("message", function(event) {
      console.log(event)
      if (event.source == window && event.data.action == "select-action") {
        selectList_change_listener(event.data.value)
      }
      if (event.source == window && event.data.action == "btn-start") {
        if (window.pageBot) {
          window.pageBot.start_button_listener()
        }
      }
      if (event.source == window && event.data.action == "btn-stop") {
        if (window.pageBot) {
          window.pageBot.stop_button_listener()
        }
      }
      if (event.source == window && event.data.action == "input-delay") {
        if (window.pageBot) {
          window.pageBot.replication_depay_listener(event.data.value)
        }
      }
      if (event.source == window && event.data.action == "refreshDone") {
        console.log("Reload done successful.")
        if (window.pageBot && window.pageBot.awaitReload) {
          console.log("PageBot can go.")
          window.pageBot.awaitReload = false
        }
      }

      if (event.source == window && event.data.action == "batch_get_statement_to_save") {
        batch_get_statement_to_save();
      }
      if (event.source == window && event.data.action == "batch_get_items_to_sign") {
        batch_get_items_to_sign();
      }
      if (event.source == window && event.data.action == "batch_get_document_to_save") {
        batch_get_document_to_save();
      }

      if (event.source == window && event.data.action == "send_message_back") {
        send_message_back();
      }
    });
  } catch (error) {
    console.log('after_inits.js :>> ', error);

  }
  console.log('init after_inits.js sadad:>> ');
  console.log("Все модули успешно загрузились!")
}

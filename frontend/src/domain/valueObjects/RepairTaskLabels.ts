export const categoryLabels: Record<string, string> = {
  HARDWARE: "Аппаратная проблема",
  SOFTWARE: "Программная проблема",
  NETWORK: "Сетевая проблема",
  PERIPHERAL: "Периферийное устройство",
};

export const priorityLabels: Record<string, string> = {
  LOW: "Низкий",
  MEDIUM: "Средний",
  HIGH: "Высокий",
  CRITICAL: "Критический",
};

export const taskStatusLabels: Record<string, string> = {
  ASSIGNED: "Назначена",
  IN_PROGRESS: "В работе",
  COMPLETED: "Завершена",
};

export const technicianStatusLabels: Record<string, string> = {
  AVAILABLE: "Доступен",
  BUSY: "Занят",
  OFFLINE: "Не в сети",
};

export const workImpactLabels: Record<string, string> = {
  CANNOT_WORK: "Работа полностью невозможна",
  PARTIALLY_CAN_WORK: "Работа возможна частично",
  CAN_WAIT: "Можно подождать",
  NOT_URGENT: "Не срочно",
};

export const specializationLabels: Record<string, string> = {
  HARDWARE: "Аппаратные проблемы",
  SOFTWARE: "Программные проблемы",
  NETWORK: "Сетевые проблемы",
  PERIPHERAL: "Периферийные устройства",
  UNIVERSAL: "Универсальный специалист",
};

export const faultTypeLabels: Record<string, string> = {
  NO_POWER: "Компьютер не включается",
  POWER_SUPPLY_FAILURE: "Неисправность блока питания",
  POWER_CONNECTOR_FAILURE: "Неисправность разъема питания",
  BATTERY_FAILURE: "Неисправность батареи ноутбука",
  STORAGE_FAILURE: "Неисправность HDD/SSD",
  STORAGE_REPLACEMENT_WITH_DATA_TRANSFER: "Замена диска с переносом данных",
  RAM_FAILURE: "Ошибка или неисправность оперативной памяти",
  OVERHEATING_COOLING_DIRTY: "Перегрев, шум вентилятора, загрязнение охлаждения",
  FAN_FAILURE: "Неисправность вентилятора",
  NO_IMAGE_SCREEN_DAMAGE: "Нет изображения, повреждение экрана",
  GPU_ARTIFACTS_FAILURE: "Артефакты изображения, проблема видеочипа/видеокарты",
  MOTHERBOARD_FAILURE: "Неисправность материнской платы",
  CPU_OR_SOCKET_FAILURE: "Проблема процессора или сокета",
  PORTS_FAILURE: "Не работают USB, audio, HDMI или другие порты",
  CASE_OR_HINGE_DAMAGE: "Повреждение корпуса или петель ноутбука",
  LIQUID_DAMAGE: "Залитие жидкостью",
  OS_NOT_BOOTING: "Операционная система не загружается",
  OS_REINSTALLATION: "Переустановка операционной системы",
  SYSTEM_FILES_DAMAGE: "Повреждение системных файлов",
  WINDOWS_BLUE_SCREEN: "Синий экран / критическая ошибка Windows",
  DRIVER_CONFLICT: "Конфликт или отсутствие драйверов",
  UPDATE_FAILURE: "Сбой обновления Windows или ПО",
  MALWARE_ACTIVITY: "Вирусы, malware, подозрительная активность",
  COMPUTER_SLOW: "Компьютер сильно тормозит",
  SOFTWARE_INSTALLATION: "Установка и настройка программного обеспечения",
  ACCOUNT_LOGIN_PROBLEM: "Проблема входа в учетную запись / пароль / профиль",
  WIFI_NOT_WORKING: "Не работает Wi-Fi",
  WIRED_NETWORK_NOT_WORKING: "Не работает проводная сеть",
  IP_DNS_SETTINGS_ERROR: "Ошибка IP/DNS/сетевых настроек",
  NETWORK_RESOURCES_ACCESS_PROBLEM: "Нет доступа к сетевым папкам или внутренним ресурсам",
  VPN_CONNECTION_PROBLEM: "Проблема подключения к VPN",
  PRINTER_CONNECTION_ISSUE: "Принтер не подключается или не печатает",
  SCANNER_NOT_WORKING: "Не работает сканер",
  KEYBOARD_NOT_WORKING: "Не работает клавиатура",
  MOUSE_TOUCHPAD_NOT_WORKING: "Не работает мышь или тачпад",
  EXTERNAL_DEVICE_NOT_DETECTED: "Не определяется внешнее устройство",
  WIFI_CONNECTION_ISSUE: "Проблема с подключением к Wi-Fi",
  "LOCAL_NETWORK_ACCESS": "Нет доступа к сетевым папкам или внутренним ресурсам",
  "OS_BOOT_FAILURE": "Сбой загрузки операционной системы",
};

export const getLabel = (
  labels: Record<string, string>,
  value: string
): string => {
  return labels[value] ?? value;
};

export const getSpecializationsLabel = (specializations: string): string => {
  return specializations
    .split(",")
    .map((specialization) => specialization.trim())
    .map((specialization) => specializationLabels[specialization] ?? specialization)
    .join(", ");
};
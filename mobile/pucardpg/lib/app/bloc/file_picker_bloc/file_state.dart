abstract class FilePickerState {}


class FileInitialState extends FilePickerState {}

class FileLoadingState extends FilePickerState {}

class FileSuccessState extends FilePickerState {
  String fileStoreId;
  FileSuccessState({required this.fileStoreId});
}

class FileFailedState extends FilePickerState {
  String errorMsg;
  FileFailedState({required this.errorMsg});
}
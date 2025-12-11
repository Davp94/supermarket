package com.blumbit.compras_ventas.service;

import java.io.File;

import com.blumbit.compras_ventas.common.dto.FileDownloadResponse;
import com.blumbit.compras_ventas.common.dto.FileRequest;
import com.blumbit.compras_ventas.common.dto.FileResponse;

public interface FileService {

    FileResponse createFile(FileRequest fileRequest);

    File retrieveFile(FileResponse fileResponse);

    FileDownloadResponse fileDownload(String filePath);

}

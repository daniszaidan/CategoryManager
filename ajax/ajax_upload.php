<?php 

    include("../koneksi.php");
    if ($_POST["type"] == "upload"){
        
        $file  = $_POST["file"];

        if ($file == "pp_cp.png") {
            echo 'gambarnya itu pp_cp';
            $new_name = $_SESSION['akun']['nama_lengkap'] . "-" . rand(0, 99999) . "-" . $_FILES['file']['name'];  
            $path = "../images/" . $new_name;

            $query = mysqli_query($connect, "UPDATE `user` SET `pp` = '$new_name' WHERE `id_user` = '$id_user'");
            move_uploaded_file($_FILES['file']['tmp_name'], $path);

            $_SESSION['akun']['pp']= $new_name;

            if ($query) {
              echo 'berhasil';
            }else{
              echo 'gagal';
            }

        }else{
            echo 'gambarnya bukan pp_cp';
            $query  = mysqli_query($connect, "SELECT `pp` FROM user WHERE `id_user` = '$id_user'");
            $data   = mysqli_fetch_row($query);
            $file     = $data[0];
            $currentPath   = "../images/" . $file;
            $deleteImage = unlink($currentPath);

            $new_name = $_SESSION['akun']['nama_lengkap'] . "-" . rand(0, 99999) . "-" . $_FILES['file']['name'];
            $path = "../images/" . $new_name;

            $query = mysqli_query($connect, "UPDATE `user` SET `pp` = '$new_name' WHERE `id_user` = '$id_user'");
            move_uploaded_file($_FILES['file']['tmp_name'], $path);

            $_SESSION['akun']['pp']= $new_name;

            if ($query) {
              echo 'berhasil';
            }else{
              echo 'gagal';
            }
        }

    }

    if ($_POST["type"] == "categoryName"){

        $query  = mysqli_query($connect, "SELECT * FROM category");

        while ($data = mysqli_fetch_array($query)) {

        echo '<li id="' .$data['id_category']. '">' .$data['category_name']. '</li>';
        }
    }


?>
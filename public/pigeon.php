<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="assets/CSS/bootstrap.min.css">
    <link rel="stylesheet" href="assets/CSS/style.css">
    <link rel="stylesheet" href=" https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        section {
            padding: 60px 0;
        }
    </style>
    <title>Mes passions</title>
</head>
<body>
<header>
    <!--    Barre de navigation-->
    <?php
    require_once '_partials/nav.php'
    ?>
</header>
<div class="container">
    <p class="fs-1 text-center jaune mt-5 arrondir p-2 text-black">
        Nombre de pigeons : <span id="compteur">1</span>
    </p>
    <div class="row arrondir bordure-grise p-3 bg-jaune text-black">
        <div id="compteur-container">

        </div>
        <img src="assets/images/pigeon.png" id="pigeon">
        <div class="col">
            <p class="text-center fs-3">
                Objectifs
                <button id="double-btn" style="display: none;" class="btn btn-lg w-100">Doubler les pigeons par clic</button>
            </p>
        </div>
    </div>
</div>


<script src="pigeon.js"></script>
</body>
</html>
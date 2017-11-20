<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;

/**
 * Class TokenController
 */
class TokenController extends \FOS\OAuthServerBundle\Controller\TokenController
{
    public function tokenAction(Request $request)
    {
        $response = parent::tokenAction($request);
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
}

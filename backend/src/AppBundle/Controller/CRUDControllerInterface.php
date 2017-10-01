<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Interface CRUDControllerInterface
 */
interface CRUDControllerInterface
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function createAction(Request $request);

    /**
     * @param Request $request
     * @param mixed   $id
     * @return JsonResponse
     */
    public function readAction(Request $request, $id);

    /**
     * @param Request $request
     * @param mixed   $id
     * @return JsonResponse
     */
    public function updateAction(Request $request, $id);

    /**
     * @param Request $request
     * @param mixed   $id
     * @return JsonResponse
     */
    public function deleteAction(Request $request, $id);
}

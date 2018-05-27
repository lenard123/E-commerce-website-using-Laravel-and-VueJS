<?php

namespace App\Http\Middleware;

use App\Http\Controllers\API\v1\ActivityLogController;
use App\Model\Category;
use App\Model\Subcategory;
use App\Model\Products;
use App\Model\Admins;
use Closure;

class ActivityLogMiddleware
{
    private $routes = [];

    public function __construct() 
    {
        $this->routes = [
            'category' => ['api/v1/category', Category::class, 'category_name'],
            'subcategory' => ['api/v1/subcategory', Subcategory::class, 'subcategory_name'],
            'product' => ['api/v1/product', Products::class, 'product_name'],
            'admin' => ['api/v1/Admin', Admins::class, 'admin_name']
        ];
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response;
         switch ($request->method()) {
             case 'DELETE':
                 $response = $this->deleteResponse($request, $next);
                 break;
             case 'POST':
                 $response = $this->insertResponse($request, $next);
                 break;
             case 'PUT':
                 $response = $this->updateResponse($request, $next);
                 break;
             default:
                 $response = $next($request);
                 break;
         }
         return $response;
    }


    /**
     * Get Route
     * @param Request $request
     * @return Object[] route
     */
    private function getRoute($request) 
    {
        $path = $request->path();
        foreach ($this->routes as $route => $val) {
            if (stristr($path, $val[0])) return $route;
        }
        return [];
    }


    /**
     * Handle delete request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    private function deleteResponse($request, $next)
    {
        $routes = $this->routes;
        $route = $this->getRoute($request);
        $a = $route == 'admin' ? 'an' : 'a';
        $name = $routes[$route][1]::find($request->segment(4))[$routes[$route][2]];
        $action = "delete $a $route named $name";

        $response = $next($request);
        if ($this->getStatus($response))
            ActivityLogController::insertActivity($action);

        return $response;
    }


    /**
     * Handle an post request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    private function insertResponse($request, $next)
    {
        $routes = $this->routes;
        $route = $this->getRoute($request);
        $a = $route == 'admin' ? 'an' : 'a';
        $name = $request->input([$routes[$route][2]]);
        $action = "add $a $route named $name";

        $response = $next($request);
        if($this->getStatus($response))
            ActivityLogController::insertActivity($action);
        
        return $response;
    }

    /**
     * Handle an put request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    private function updateResponse($request, $next)
    {
        $routes = $this->routes;
        $route = $this->getRoute($request);
        $a = $route == 'admin' ? 'an' : 'a';
        $oldname = $routes[$route][1]::find($request->segment(4))[$routes[$route][2]];
        $newname = $request->input([$routes[$route][2]]);
        if ($oldname == $newname)
            $action = "update $route named $oldname";
        else 
            $action = "update $route named $oldname to $newname";

        $response = $next($request);
        if ($this->getStatus($response))
            ActivityLogController::insertActivity($action);

        return $response;
    }


    /**
     * Get the response status
     * @param Response $response
     * @return Sting status
     */
    private function getStatus($response)
    {
        $data = $response->original;
        $status = isset($data['status']) ? $data['status'] : '';
        return ($status == 'success') ? true : false;
    }


}
